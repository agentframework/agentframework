import { IAttribute } from '../Core/IAttribute';
import { Reflector } from '../Reflection/Reflector';
import { CanDecorate } from '../Compiler/Internal/Utils';

/**
 * Decorate class with attribute
 */
export function decorateClass(attribute: IAttribute): ClassDecorator {
  // upgrade prototype
  return (target: Function): void => {
    if (CanDecorate(attribute, target)) {
      Reflector(target).addAttribute(attribute);
    }
    return void 0;
  };
}

/**
 * Decorate class properties (field, getter, setter and methods)
 */
export function decorateClassMember(attribute: IAttribute) {
  return (target: Object, propertyKey: string | symbol, descriptor?: PropertyDescriptor): void => {
    if (CanDecorate(attribute, target, propertyKey, descriptor)) {
      Reflector(target)
        .property(propertyKey, descriptor)
        .addAttribute(attribute);
    }
  };
}

/**
 * Decorate class method
 */
export function decorateClassMethod(attribute: IAttribute): MethodDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {
    if (CanDecorate(attribute, target, propertyKey, descriptor)) {
      Reflector(target)
        .property(propertyKey, descriptor)
        .value.addAttribute(attribute);
    }
  };
}

/**
 * Decorate class field
 */
export function decorateClassField(attribute: IAttribute): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor?: PropertyDescriptor): void => {
    // TypeScript is not smart enough to identify the PropertyDescriptor on method
    if (descriptor) {
      throw new TypeError(
        `${Reflect.getPrototypeOf(attribute).constructor.name} can only decorate on class field property`
      );
    }
    if (CanDecorate(attribute, target, propertyKey)) {
      Reflector(target)
        .property(propertyKey)
        .value.addAttribute(attribute);
    }
  };
}
