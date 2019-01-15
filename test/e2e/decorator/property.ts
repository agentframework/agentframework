import 'jasmine';
import { IAttribute, decorateClassField } from '../../../src/lib';


export function propertyDecorator() {
  return decorateClassField(new PropertyDecoratorAttribute());
}

class PropertyDecoratorAttribute implements IAttribute {

  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
    return true;
  }

}
