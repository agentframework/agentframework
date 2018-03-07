import { IInvocation } from '../invocation';
import { AgentOptions } from '../agent';
import { IInterceptor } from '../interceptor';
import { AgentCompileType, AgentFeatures, CompilerOptions } from '../compiler';
import { Compiler } from '../compiler';
import { IDesign } from '../design';
import { CONSTRUCTOR_INITIALIZER } from '../symbol';

/**
 * Invoke the origin constructor
 */
export class ConstructInvocation implements IInvocation {

  _target: any;
  _design: IDesign;
  _compiledTarget: any;
  _options: Partial<AgentOptions>;
  _compilerOptions: Partial<CompilerOptions>;
  _targetProxy: boolean;
  _targetConstructor: boolean;

  // This constructor will be called during upgrade agent constructor
  constructor(target: any, options: Partial<AgentOptions>, design: IDesign) {

    this._target = target;
    this._options = options;
    this._design = design;

    // make compiler options
    const compilerOptions: Partial<CompilerOptions> = {
      features: this._options.features,
      target: 'function'
    };
    const compileTarget = this._options.compile % 10;
    if (AgentCompileType.StaticClass === compileTarget) {
      compilerOptions.target = 'class';
    }
    else if (AgentCompileType.StaticProxy === compileTarget) {
      compilerOptions.target = 'proxy';
    }
    this._compilerOptions = compilerOptions;
    this._targetProxy = compilerOptions.target === 'proxy';
    this._targetConstructor = (options.features & AgentFeatures.Constructor) === AgentFeatures.Constructor;

    if (AgentFeatures.Disabled === options.features) {
      // user defined interceptors will be disabled, this is good for metadata only class
      this.invoke = function () {
        return Reflect.construct(target, arguments);
      };
    }

  }

  get design(): IDesign {
    return this._design;
  }

  get target(): any {
    return this._target;
  }


  invoke(params: ArrayLike<any>) {

    const target = this._target;
    let agent;

    if (!this._compiledTarget) {
      this._compiledTarget = (new Compiler(this._compilerOptions)).compile(target, params);
    }

    const initializers: Map<number, IInvocation> = target[CONSTRUCTOR_INITIALIZER];

    if (initializers && initializers.size) {

      const args = Array.prototype.slice.call(params, 0);

      // generate initializer / interceptor chain
      for (const idx of initializers.keys()) {
        args[idx] = initializers.get(idx).invoke([params[idx]]);
      }

      agent = Reflect.construct(target, args, this._compiledTarget);

    }
    else {
      agent = Reflect.construct(target, params, this._compiledTarget);
    }


    if (this._targetProxy) {
      agent = new Proxy(agent, {
        getPrototypeOf(instance: any): object | null {
          return target.prototype;
        }
      });
    }

    // fire @ready events

    return agent;

  }


  /**
   * This function will be called when creating a new instance of current agent
   */
  // invoke2() {
  //
  //   const target = this._target;
  //   let agent;
  //   let bag: PropertyDescriptorMap, hook: PropertyDescriptorMap;
  //
  //   if ((this._options.features & AgentFeatures.Initializer) > 0) {
  //
  //     const initializers: Map<string | symbol, IInvocation> = this.initializers;
  //
  //     // invoke all initializers to generate default value bag
  //     if (initializers && initializers.size) {
  //       // bag = new Map<string, any>();
  //       for (const [key, initializer] of initializers) {
  //         const initializedValue = (initializer as IInvocation).invoke(arguments);
  //         if (initializedValue != null) {
  //           bag = bag || {};
  //           // bag.set(key, { value: initializedValue });
  //           bag[key] = { value: initializedValue };
  //         }
  //       }
  //     }
  //
  //   }
  //
  //   // if ((this._options.features & AgentFeatures.Interceptor) > 0) {
  //   //   hook = this.interceptors;
  //   // }
  //
  //   // Do not create dynamic agent if no initializers or interceptors
  //   if (bag || hook) {
  //
  //     // ===============================================================
  //     // introduce DynamicAgent for interceptors
  //     // create transparent layer for property injector
  //     // If modify target.prototype. All class instance will be modified
  //     const compileOption = this._options.compile % 10;
  //
  //     let DynamicAgent;
  //
  //     // EPIC: inject the intercepted value before construct a new instance
  //     if (compileOption === AgentCompileType.StaticFunction) {
  //
  //       /* istanbul ignore next */
  //       DynamicAgent = function () {
  //       };
  //       DynamicAgent.prototype = Object.create(this.compile.prototype);
  //       // hook && Object.defineProperties(DynamicAgent.prototype, hook);
  //       bag && Object.defineProperties(DynamicAgent.prototype, bag);
  //       agent = Reflect.construct(target, arguments, DynamicAgent);
  //
  //     }
  //     else {
  //
  //       DynamicAgent = class extends target {
  //       };
  //       hook && Object.defineProperties(DynamicAgent.prototype, hook);
  //       bag && Object.defineProperties(DynamicAgent.prototype, bag);
  //       agent = Reflect.construct(target, arguments, DynamicAgent);
  //
  //     }
  //
  //     // // call constructor on target with DynamicAgent.prototype
  //     // const applies = new Map<string, PropertyDescriptor>();
  //     //
  //     // // Skip if user called defineProperty
  //     // // save current value, in case user have modified it
  //     // for (const key of Object.keys(bag)) {
  //     //   const value = bag[key];
  //     //   if (!agent.hasOwnProperty(agent, key)) {
  //     //     applies.set(key, value);
  //     //   }
  //     // }
  //     // const test = Object.create(target, bag);
  //     // agent = Reflect.apply(target.prototype.constructor, test, arguments);
  //     // agent = Reflect.construct(target, arguments);
  //
  //     // Object.setPrototypeOf(agent, target.prototype);
  //     // hook && Object.defineProperties(agent, hook);
  //     // bag && Object.defineProperties(agent, bag);
  //
  //     //
  //     // if (applies.size) {
  //     //   for (const [key, value] of applies) {
  //     //     agent[key] = value;
  //     //   }
  //     // }
  //
  //     // Add ES6 Proxy to support field property interception
  //     // if (hook && compileOption === AgentCompileType.StaticProxy) {
  //     //   agent = AddProxyInterceptor(agent);
  //     // }
  //     //
  //     // agent = new Proxy(agent, {
  //     //       getPrototypeOf(instance: any): object | null {
  //     //         return target.prototype;
  //     //         // let origin;
  //     //         // if (Reflect.has(target, PROXY_PROTOTYPE)) {
  //     //         //   origin = Reflect.get(target, PROXY_PROTOTYPE);
  //     //         // }
  //     //         // return origin || Reflect.getPrototypeOf(target);
  //     //       },
  //     // });
  //     //
  //   }
  //   else {
  //     agent = Reflect.construct(target, arguments);
  //   }
  //
  //   // // invoke @ready
  //   // Reflection.getAttributes<ReadyAttribute>(target, ReadyAttribute)
  //   //   .forEach((value: Array<ReadyAttribute>, key: string) => {
  //   //     if (value.length) {
  //   //       const readyFn = agent[key];
  //   //       if (readyFn && IsFunction(readyFn)) {
  //   //         Reflect.apply(readyFn, agent, arguments);
  //   //       }
  //   //     }
  //   //   });
  //
  //   return agent;
  //
  // }

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

