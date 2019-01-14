import { Member } from './Member';
import { Parameter } from './Parameter';
import { IsNumber } from './Utils';

/**
 * Method
 */
export class Method<P> extends Member<P> {
  private readonly _parameters: Array<Parameter<Method<P>>>;
  private _cachedParameters: Array<Parameter<Method<P>>>;

  constructor(parent: P, public maxParameters: number) {
    super(parent);
    this._parameters = new Array<Parameter<Method<P>>>();
  }

  parameter(index: number): Parameter<Method<P>> {
    // throw error if out of bound
    if (IsNumber(this.maxParameters) && index > this.maxParameters) {
      throw new TypeError(`Parameter index out of boundary: ${index}. Max is ${this.maxParameters}`);
    }
    let parameter = this._parameters[index];
    if (!parameter) {
      parameter = new Parameter(this, index);
      this._parameters[index] = parameter;
    }
    return parameter;
  }

  parameters(): Array<Parameter<Method<P>>> {
    if (!this._cachedParameters) {
      this._cachedParameters = this._parameters.filter(p => p.hasInitializer() || p.hasInterceptor());
    }
    return this._cachedParameters;
  }

  hasParameters(): boolean {
    return this.parameters().length > 0;
  }

  get paramtypes(): Array<any> {
    return this.getMetadata('design:paramtypes');
  }

  get returntype(): any {
    return this.getMetadata('design:returntype');
  }
}
