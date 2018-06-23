import { decorate, decorateClassField, Target, UniversalDecorator } from '../core/decorator';
import { IAttribute } from '../core/attribute';
import { IInvocation } from '../core/invocation';
import { IInitializer } from '../core/initializer';
import { Constructor } from '../core/constructor';
import { IsFunction, IsString } from '../core/utils';

/**
 * @ignore
 * @hidden
 * @param {Constructor | string} typeOrIdentifier
 * @returns {UniversalDecorator}
 */
export function inject(typeOrIdentifier?: Constructor | string): UniversalDecorator {
  return decorate(new InjectAttribute(typeOrIdentifier), Target.ConstructorParameter | Target.Field);
}

/**
 * @ignore
 * @hidden
 */
export class InjectAttribute implements IAttribute, IInitializer {

  constructor(private _typeOrIdentifier?: Constructor | string) {

  }

  beforeDecorate?(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
    // TODO: inject attribute should only define once for a property
    return true;
  }

  get typeOrIdentifier() {
    return this._typeOrIdentifier;
  }

  getInitializer(): IInitializer {
    return this;
  }

  public initialize(target: IInvocation, parameters: ArrayLike<any>): any {

    if (IsFunction(this.typeOrIdentifier)) {
      return Reflect.construct(this.typeOrIdentifier as Constructor, []);
    }
    else if (IsString(this.typeOrIdentifier)) {
      throw new Error(`Not supported dependence injection from identifier`);
    }
    else if (IsFunction(target.design.type)) {
      return Reflect.construct(target.design.type as Constructor, []);
    }
    else {
      throw new Error(`Agent ${this.typeOrIdentifier} not found`);
    }

  }

}
