import { IInvocation } from '../invocation';
import { IInitializer } from '../initializer';
import { Reflector } from '../reflector';
import { Reflection } from '../reflection';
import { AgentAttribute } from '../agent';
import { IAgentAttribute } from '../attribute';

/**
 * Read the property from origin prototype
 */
export class ValueInvocation implements IInvocation {

  constructor(private _target: any, private _propertyKey: PropertyKey) {
  }

  get target(): any {
    return this._target;
  }

  invoke(parameters: ArrayLike<any>): any {
    return this._propertyKey;
  }

}

export class AgentInitializerInvocation implements IInvocation {
  
  constructor(private _target: any, private _attribute: IAgentAttribute) {
  }
  
  get target(): any {
    return this._target;
  }
  
  get attribute(): IAgentAttribute {
    return this._attribute;
  }
  
  invoke(parameters: ArrayLike<any>): any {
    throw new Error('Not supported');
  }
  
}

/**
 * Invocation for an initializer
 */
export class InitializerInvocation implements IInvocation {

  constructor(private _invocation: IInvocation, private _initializer: IInitializer) {
  }

  get target(): any {
    return this._invocation.target;
  }

  invoke(parameters: ArrayLike<any>): any {
    return this._initializer.initialize(this._invocation, parameters);
  }

}
