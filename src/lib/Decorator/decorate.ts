import { IAttribute } from '../Core/IAttribute';
import { Reflector } from '../Reflection/Reflector';
import { CanDecorate } from '../Compiler/Internal/Utils';

export enum Target {
  Constructor = 1,
  ConstructorParameter = 2,
  Field = 4,
  Method = 8,
  MethodParameter = 16,
  Getter = 32,
  Setter = 64
}

/**
 * This is universal decorator for all supported target
 */
export interface UniversalDecorator {
  (target: Function | Object, targetKey?: string | symbol, descriptor?: number | PropertyDescriptor): any;
}

/**
 * Decorate attribute to the target
 */
export function decorate(attribute: IAttribute, allows: Target): UniversalDecorator {
  return (target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor | number): any => {
    const attributeName = Reflect.getPrototypeOf(attribute).constructor.name;
    const isClass = typeof target === 'function';
    const descriptorType = typeof descriptor;

    if (isClass) {
      if (typeof descriptor === 'number') {
        // this is constructor parameter
        if (Target.ConstructorParameter !== (allows & Target.ConstructorParameter)) {
          throw new TypeError(`${attributeName} is not allow decorate on constructor parameters`);
        }
      } else {
        // this is constructor
        if (Target.Constructor !== (allows & Target.Constructor)) {
          throw new TypeError(`${attributeName} is not allow decorate on class`);
        }
      }
    } else {
      if (typeof descriptor === 'number') {
        // this is constructor parameter
        if (Target.MethodParameter !== (allows & Target.MethodParameter)) {
          throw new TypeError(`${attributeName} is not allow decorate on method parameters`);
        }
      } else if (typeof descriptor === 'object') {
        if (descriptor['value']) {
          if (typeof descriptor['value'] === 'function') {
            // this is method
            if (Target.Method !== (allows & Target.Method)) {
              throw new TypeError(`${attributeName} is not allow decorate on method`);
            }
          } else {
            // this is field
            if (Target.Field !== (allows & Target.Field)) {
              throw new TypeError(`${attributeName} is not allow decorate on field`);
            }
          }
        }
        if (descriptor['get']) {
          // this is constructor parameter
          if (Target.Getter !== (allows & Target.Getter)) {
            throw new TypeError(`${attributeName} is not allow decorate on getter`);
          }
        }
        if (descriptor['set']) {
          // this is constructor parameter
          if (Target.Setter !== (allows & Target.Setter)) {
            throw new TypeError(`${attributeName} is not allow decorate on setter`);
          }
        }
      } else {
        // this is constructor
        if (Target.Field !== (allows & Target.Field)) {
          throw new TypeError(`${attributeName} is not allow decorate on field`);
        }
      }
    }

    if (CanDecorate(attribute, target, targetKey)) {
      if (isClass) {
        if (descriptorType === 'number') {
          Reflector(target)
            .parameter(descriptor as number)
            .addAttribute(attribute);
        } else {
          Reflector(target).addAttribute(attribute);
        }
      } else {
        if (descriptorType === 'number') {
          Reflector(target)
            .property(targetKey)
            .value.parameter(descriptor as number)
            .addAttribute(attribute);
        } else if (descriptorType === 'object') {
          Reflector(target)
            .property(targetKey, descriptor as PropertyDescriptor)
            .value.addAttribute(attribute);
        } else {
          Reflector(target)
            .property(targetKey)
            .value.addAttribute(attribute);
        }
      }
    }
  };
}
