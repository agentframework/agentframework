import { decorateClassMember, decorateClassPropertyOrGetter } from '../core/decorator';
import { IAttribute } from '../core/attribute';
import { IInterceptor } from '../core/interceptor';
import { IInvocation } from '../core/invocation';
import { Agent } from '../agent';
import { LocalDomain } from '../domain';


export function inject(typeOrIdentifier: Agent | string) {
  return decorateClassPropertyOrGetter(new InjectAttribute(typeOrIdentifier));
}

export class InjectAttribute implements IAttribute, IInterceptor {

  constructor(private _typeOrIdentifier: Agent | string) {
  }

  beforeDecorate?(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
    // TODO: inject attribute should only define once for a property
    return true;
  }

  get typeOrIdentifier() {
    return this._typeOrIdentifier;
  }

  getInterceptor(): IInterceptor {
    return this;
  }

  intercept(invocation: IInvocation, parameters: ArrayLike<any>): any {
    return LocalDomain.getAgent(this.typeOrIdentifier);
  }

}
