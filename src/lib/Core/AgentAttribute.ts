
import { IAttribute } from './IAttribute';
import { IInvocation } from './IInvocation';
import { IInterceptor } from './IInterceptor';
import { AgentFeatures } from './AgentFeatures';
import { IInitializer } from './IInitializer';
import { ICompiler } from './ICompiler';
import { AgentCompiler } from '../Compiler/AgentCompiler';
import { AgentFramework } from './AgentFramework';
import { ClassInitializer } from '../Compiler/Initializer/ClassInitializer';

// map from Agent to origin constructor
export const Constructors = new WeakMap<any, any>();

/**
 * This attribute is for agent / domain management
 */
export class AgentAttribute implements IAttribute, IInterceptor {
  private _target: Function;

  features: AgentFeatures = AgentFeatures.Constructor | AgentFeatures.Initializer | AgentFeatures.Interceptor;

  get compiler(): ICompiler {
    return new AgentCompiler();
  }

  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
    if (typeof target !== 'function') {
      throw new TypeError('Unable to decorate agent for non-function type');
    }

    // throw TypeError if agent attribute already decorated
    if (Constructors.has(target)) {
      const originalType = Constructors.get(target);
      throw new TypeError(`Unable to decorate multiple agent for class` + ` '${originalType.name}'`);
    }

    this._target = target;
    return true;
  }

  getInitializer(): IInitializer {
    return AgentFramework.GetSingleton(ClassInitializer);
  }

  getInterceptor(): IInterceptor {
    return this;
  }

  intercept(target: IInvocation, parameters: ArrayLike<any>): any {
    const Agent = target.invoke(parameters);
    // tag Agent
    Constructors.set(Agent, this._target);
    return Agent;
  }
}
