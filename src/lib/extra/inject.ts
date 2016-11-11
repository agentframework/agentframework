import { IAttribute, IInterceptor } from '../core';
import { decorateClassProperty } from '../core/decorator';
import { Agent } from '../agent';

export function inject(typeOrIdentifier: Agent | string) {
  return decorateClassProperty(new InjectAttribute(typeOrIdentifier));
}

export class InjectAttribute implements IAttribute {

  constructor(private _typeOrIdentifier: Agent | string) {
  }

  get typeOrIdentifier() {
    return this._typeOrIdentifier;
  }

  getInterceptor(): IInterceptor {
    return null;
  }

}
