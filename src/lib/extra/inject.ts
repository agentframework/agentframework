import { decorateClassMember, decorateClassPropertyOrGetter } from '../core/decorator';
import { IAttribute } from '../core/attribute';
import { IInvocation } from '../core/invocation';
import { LocalDomain } from '../domain';
import { IInitializer } from '../core/initializer';
import { Constructor } from '../core/constructor';



export function inject(typeOrIdentifier: Constructor | string) {
  return decorateClassPropertyOrGetter(new InjectAttribute(typeOrIdentifier));
}

export class InjectAttribute implements IAttribute, IInitializer {

  constructor(private _typeOrIdentifier: Constructor | string) {
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
    const origin = target.invoke(parameters);
    return LocalDomain.getAgent(this.typeOrIdentifier);
  }

}
