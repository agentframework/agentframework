import { IInvocation } from '../invocation';
import { IInitializer } from '../initializer';
import { IAgentAttribute } from '../attribute';
import { IDesign } from '../design';

/**
 * Read the property from origin prototype
 */
export class ValueInvocation implements IInvocation {

  constructor(private _target: any, private _propertyKey: PropertyKey, private _design: IDesign) {
  }

  get design(): IDesign {
    return this._design;
  }

  get target(): any {
    return this._target;
  }

  invoke(parameters: ArrayLike<any>): any {
    return this._propertyKey;
  }

}

export class ParameterInvocation implements IInvocation {

  constructor(private _target: any, private _design: IDesign) {
  }

  get design(): IDesign {
    return this._design;
  }

  get target(): any {
    return this._target;
  }

  invoke(parameters: ArrayLike<any>): any {
    return this._target;
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
