import { Decoratable } from './decoratable';
import { Parameter } from './parameter';
import { IsNumber } from './utils';

/**
 * Method
 */
export class Method extends Decoratable {
  private readonly _maxParameters: number;
  private readonly _parameters: Map<number, Parameter>;

  constructor(maxParameters: number) {
    super();
    // prevent access parameter outside the boundary
    if (IsNumber(maxParameters)) {
      this._maxParameters = maxParameters;
    }
    this._parameters = new Map<number, Parameter>();
  }

  parameterCount(): number {
    return this._maxParameters;
  }

  parameter(index: number): Parameter {
    if (IsNumber(this._maxParameters) && index > this._maxParameters) {
      throw new TypeError(`Invalid parameter index: ${index}`);
    }
    let parameter = this._parameters.get(index);
    if (!parameter) {
      parameter = new Parameter();
      this._parameters.set(index, parameter);
    }
    return parameter;
  }
  
  get paramtypes(): Array<any> {
    return this.getMetadata('design:paramtypes');
  }
  
  get returntype(): any {
    return this.getMetadata('design:returntype');
  }
}
