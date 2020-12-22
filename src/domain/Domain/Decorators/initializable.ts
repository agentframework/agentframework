import { decorateClass } from '../../../dependencies/core';
import { InitializableAttribute } from '../Attributes/InitializableAttribute';

export function initializable() {
  return decorateClass(new InitializableAttribute());
}
