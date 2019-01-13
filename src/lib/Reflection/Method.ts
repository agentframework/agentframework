import { Member } from './Member';
import { Parameter } from './Parameter';
import { IsNumber } from './Utils';

/**
 * Method
 */
export class Method<P> extends Member<P> {
  private readonly _parameters: Map<number, Parameter<Method<P>>>;
  private _parametersArray: Array<[number, Parameter<Method<P>>]>;

  constructor(parent: P | null, public maxParameters: number) {
    super(parent);
    this._parameters = new Map<number, Parameter<Method<P>>>();
  }

  parameter(index: number): Parameter<Method<P>> {
    // throw error if out of bound
    if (IsNumber(this.maxParameters) && index > this.maxParameters) {
      throw new TypeError(`Parameter index out of boundary: ${index}. Max is ${this.maxParameters}`);
    }
    let parameter = this._parameters.get(index);
    if (!parameter) {
      parameter = new Parameter(this);
      this._parameters.set(index, parameter);
    }
    delete this._parametersArray;
    return parameter;
  }

  getAvailableParameters(): Array<[number, Parameter<Method<P>>]> {
    if (!this._parametersArray) {
      this._parametersArray = [];
      for (const entry of this._parameters.entries()) {
        if (entry[1].hasInterceptor() || entry[1].hasInitializer()) {
          this._parametersArray.push(entry);
        }
      }
    }
    return this._parametersArray;
  }

  isParametersAvailable(): boolean {
    return this.getAvailableParameters().length > 0;
  }

  get paramtypes(): Array<any> {
    return this.getMetadata('design:paramtypes');
  }

  get returntype(): any {
    return this.getMetadata('design:returntype');
  }
}
