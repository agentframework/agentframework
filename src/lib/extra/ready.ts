import { IAttribute, IInterceptor } from '../core';
import { decorateClassMethod } from '../core/decorator';

export function ready() {
  return decorateClassMethod(new ReadyAttribute());
}

export class ReadyAttribute implements IAttribute {

  constructor() {
  }

  getInterceptor(): IInterceptor {
    return null;
  }

}
