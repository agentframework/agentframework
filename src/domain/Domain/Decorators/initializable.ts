import { decorateClass } from '../../../dependencies/core';
import { InitializableAttribute } from '../Attributes/InitializableAttribute';

export function initializable(): ClassDecorator {
  return decorateClass(new InitializableAttribute());
}
