import { IAgentAttribute, IAttribute } from './attribute';
import { ORIGIN_CONSTRUCTOR } from './symbol';
import { GetGlobalInitializer, IInitializer } from './initializer';
import { IDomain } from '../domain';
import { IsObject } from './utils';
import { IInterceptor } from './interceptor';
import { IInvocation } from './invocation';
import {
  LazyClassConstructorInitializer,
  LazyFunctionConstructorInitializer,
  LazyProxyConstructorInitializer
} from './initializers/construct.lazy';
import {
  StaticClassConstructorInitializer,
  StaticFunctionConstructorInitializer,
  StaticProxyConstructorInitializer
} from './initializers/construct.static';
import {
  DynamicClassConstructorInitializer,
  DynamicFunctionConstructorInitializer,
  DynamicProxyConstructorInitializer
} from './initializers/construct.dynamic';
import { AgentCompileType, AgentFeatures } from './compiler';


export interface AgentOptions {
  attribute: IAttribute,
  domain: IDomain,
  features: AgentFeatures,
  compile: AgentCompileType,
  initializer: IInitializer
}

/**
 * Agent class attribute to upgrade user class to agent using customized IInitializer
 */
export class AgentAttribute implements IAgentAttribute, IInterceptor {

  _target: Function;
  _targetName: string;
  _options: AgentOptions;

  constructor(options?: any) {
    this._options = options || {};
    this._options.compile = this._options.compile || AgentCompileType.LazyFunction
  }

  get options(): AgentOptions {
    return this._options;
  }

  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {

    const origin = Object.getOwnPropertyDescriptor(target, ORIGIN_CONSTRUCTOR);

    // throw TypeError if agent attribute already decorated
    if (origin) {
      throw new TypeError(`Unable to decorate as agent more than one time for class` +
        ` '${origin.value.prototype.constructor.name}'`);
    }

    this._target = target as Function;
    this._targetName = (target as Function).prototype.constructor.name;

    return true;
  }

  getInitializer(): IInitializer {
    // return an initializer for current agent options

    // make a new constructor from chained interceptors which defined in class attributes
    const compileType = this._options.compile;
    let initializer;

    if (AgentCompileType.LazyFunction === compileType) {
      initializer = GetGlobalInitializer(LazyFunctionConstructorInitializer);
    }
    else if (AgentCompileType.LazyClass === compileType) {
      initializer = GetGlobalInitializer(LazyClassConstructorInitializer);
    }
    else if (AgentCompileType.LazyProxy === compileType) {
      initializer = GetGlobalInitializer(LazyProxyConstructorInitializer);
    }
    else if (AgentCompileType.StaticFunction === compileType) {
      initializer = GetGlobalInitializer(StaticFunctionConstructorInitializer);
    }
    else if (AgentCompileType.StaticClass === compileType) {
      initializer = GetGlobalInitializer(StaticClassConstructorInitializer);
    }
    else if (AgentCompileType.StaticProxy === compileType) {
      initializer = GetGlobalInitializer(StaticProxyConstructorInitializer);
    }
    else if (AgentCompileType.DynamicFunction === compileType) {
      initializer = GetGlobalInitializer(DynamicFunctionConstructorInitializer);
    }
    else if (AgentCompileType.DynamicClass === compileType) {
      initializer = GetGlobalInitializer(DynamicClassConstructorInitializer);
    }
    else if (AgentCompileType.DynamicProxy === compileType) {
      initializer = GetGlobalInitializer(DynamicProxyConstructorInitializer);
    }
    else if (AgentCompileType.Custom === compileType) {
      initializer = this._options.initializer;
    }

    if (!IsObject(initializer)) {
      throw new Error(`Not supported agent compile type: ${compileType} on type ${this._targetName}`);
    }

    return initializer;

  }

  getInterceptor(): IInterceptor {
    return this;
  }

  intercept(target: IInvocation, parameters: ArrayLike<any>): any {

    const AgentProxy = target.invoke(parameters);

    // this property can not be changed.
    Object.defineProperty(AgentProxy, ORIGIN_CONSTRUCTOR, {
      configurable: false,
      enumerable: false,
      value: target,
      writable: false
    });

    // // define agent constructor on target
    // Object.defineProperty(this._target, AGENT_CONSTRUCTOR, {
    //   configurable: false,
    //   enumerable: false,
    //   value: AgentProxy,
    //   writable: false
    // });

    return AgentProxy;
  }

}
