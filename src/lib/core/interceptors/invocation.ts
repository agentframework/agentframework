import { IInvocation } from '../invocation';
import { AgentCompileType, AgentFeatures, AgentOptions } from '../decorator';
import { CreatePropertyInitializers } from '../initializers/property';
import { IInterceptor } from '../interceptor';
import { CreatePropertyInterceptors } from './property';

/**
 * Invoke the origin constructor
 */
export class ConstructInvocation implements IInvocation {

  // _compiledTarget: any;
  _initializers: Map<string, IInvocation>;
  _interceptors: PropertyDescriptorMap;

  // This constructor will be called during upgrade agent constructor
  constructor(private _target: any, private _options: Partial<AgentOptions>) {

    // compile initializers and interceptors during upgrade agent
    if (_options.compile < AgentCompileType.DynamicFunction) {
      if ((this._options.features & AgentFeatures.Initializer) > 0) {
        this._initializers = CreatePropertyInitializers(_target);
      }
      if ((this._options.features & AgentFeatures.Interceptor) > 0) {
        this._interceptors = CreatePropertyInterceptors(_target);
      }
    }

    if (AgentFeatures.Disabled === _options.features) {
      // user defined interceptors will be disabled, this is good for metadata only class
      this.invoke = function () {
        return Reflect.construct(this._target, arguments);
      };
    }

  }

  get target(): any {
    return this._target;
  }

  // get compiledTarget(): any {
  //   if (!this._compiledTarget) {
  //     this._compiledTarget = CompileAgent(this._target, this._options);
  //   }
  //   return this._compiledTarget;
  // }

  get initializers(): Map<string, IInvocation> {
    if (!this._initializers) {
      // Lazy compile
      this._initializers = CreatePropertyInitializers(this._target);
    }
    return this._initializers;
  }

  get interceptors(): PropertyDescriptorMap {
    if (!this._interceptors) {
      // Lazy compile
      this._interceptors = CreatePropertyInterceptors(this._target);
    }
    return this._interceptors;
  }

  /**
   * This function will be called when creating a new instance of current agent
   */
  invoke() {

    const target = this._target;
    let agent;
    let bag: PropertyDescriptorMap, hook: PropertyDescriptorMap;

    if ((this._options.features & AgentFeatures.Initializer) > 0) {

      const initializers: Map<string, IInvocation> = this.initializers;

      // invoke all initializers to generate default value bag
      if (initializers && initializers.size) {
        // bag = new Map<string, any>();
        for (const [key, initializer] of initializers) {
          const initializedValue = (initializer as IInvocation).invoke(arguments);
          if (initializedValue != null) {
            bag = bag || {};
            // bag.set(key, { value: initializedValue });
            bag[key] = { value: initializedValue };
          }
        }
      }

    }

    if ((this._options.features & AgentFeatures.Interceptor) > 0) {
      hook = this.interceptors;
    }

    // Do not create dynamic agent if no initializers or interceptors
    if (bag || hook) {

      // ===============================================================
      // introduce DynamicAgent for interceptors
      // create transparent layer for property injector
      // If modify target.prototype. All class instance will be modified
      const compileOption = this._options.compile % 10;

      let DynamicAgent;

      // EPIC: inject the intercepted value before construct a new instance
      if (compileOption === AgentCompileType.StaticFunction) {

        DynamicAgent = function () {
        };
        DynamicAgent.prototype = Object.create(target.prototype);
        hook && Object.defineProperties(DynamicAgent.prototype, hook);
        bag && Object.defineProperties(DynamicAgent.prototype, bag);
        agent = Reflect.construct(target, arguments, DynamicAgent);

      }
      else {

        DynamicAgent = class extends target {
        };
        hook && Object.defineProperties(DynamicAgent.prototype, hook);
        bag && Object.defineProperties(DynamicAgent.prototype, bag);
        agent = Reflect.construct(target, arguments, DynamicAgent);

      }

      // call constructor on target with DynamicAgent.prototype
      // const applies = new Map<string, PropertyDescriptor>();
      //
      // // Skip if user called defineProperty
      // // save current value, in case user have modified it
      // for (const [key, value] of bag) {
      //   if (!agent.hasOwnProperty(agent, key)) {
      //     applies.set(key, value);
      //   }
      // }
      //
      // Object.setPrototypeOf(agent, target.prototype);
      //
      // if (applies.size) {
      //   for (const [key, value] of applies) {
      //     agent[key] = value;
      //   }
      // }

      // // Add ES6 Proxy to support field property interception
      // if (hook && compileOption === AgentCompileType.StaticProxy) {
      //   agent = AddProxyInterceptor(agent);
      // }

    }
    else {
      agent = Reflect.construct(target, arguments);
    }
  
    // // invoke @ready
    // Reflection.getAttributes<ReadyAttribute>(target, ReadyAttribute)
    //   .forEach((value: Array<ReadyAttribute>, key: string) => {
    //     if (value.length) {
    //       const readyFn = agent[key];
    //       if (readyFn && IsFunction(readyFn)) {
    //         Reflect.apply(readyFn, agent, arguments);
    //       }
    //     }
    //   });
    
    return agent;

  }

}

// /**
//  * Get using origin getter
//  */
// export class GetterInvocation implements IInvocation {
//
//   constructor(private _target: any, private _propertyKey: PropertyKey, private _receiver: any) {
//   }
//
//   get target(): any {
//     return this._target;
//   }
//
//   invoke(parameters: ArrayLike<any>): any {
//     if (this._receiver) {
//       return Reflect.get(this._target, this._propertyKey, this._receiver);
//     }
//     else {
//       return this._target[this._propertyKey];
//     }
//   }
//
// }

// /**
//  * Set using origin setter
//  */
// export class SetterInvocation implements IInvocation {
//
//   constructor(private _target: any, private _propertyKey: PropertyKey, private _receiver: any) {
//   }
//
//   get target(): any {
//     return this._target;
//   }
//
//   invoke(parameters: ArrayLike<any>): any {
//     return Reflect.set(this._target, this._propertyKey, parameters[0], this._receiver);
//   }
//
// }

/**
 * Invocation for an interceptor, it call next interceptor in chain
 */
export class InterceptorInvocation implements IInvocation {

  constructor(private _invocation: IInvocation, private _interceptor: IInterceptor) {
  }

  get target(): any {
    return this._invocation.target;
  }

  invoke(parameters: ArrayLike<any>): any {
    return this._interceptor.intercept(this._invocation, parameters);
  }

}

