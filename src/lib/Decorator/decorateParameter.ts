import { IAttribute } from '../Core/IAttribute';
import { Reflector } from '../Reflection/Reflector';
import { CanDecorate } from '../Compiler/Internal/Utils';

/**
 * Decorate class method parameter
 */
export function decorateParameter(attribute: IAttribute): ParameterDecorator {
  return (target: Object, propertyKey: string | symbol, parameterIndex: number): void => {
    if (CanDecorate(attribute, target, propertyKey, parameterIndex)) {
      if (propertyKey == null) {
        // this is for constructor
        Reflector(target)
          .parameter(parameterIndex)
          .addAttribute(attribute);
      } else {
        // parameter for methods, only method have parameters
        Reflector(target)
          .property(propertyKey)
          .value.parameter(parameterIndex)
          .addAttribute(attribute);
      }
    }
  };
}
