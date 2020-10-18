import { AnyConstructor, decorateClassProperty } from '../../../dependencies/core';
import { InjectAttribute } from '../Attributes/InjectAttribute';
import { PropertyDecorator } from '../../../dependencies/core';

/**
 * Inject an existing instance in current domain scope. will be `null` if no matching instance found.
 *
 * @param type
 */
export function inject<T extends object>(type?: AnyConstructor<T> ): PropertyDecorator {
  return decorateClassProperty(new InjectAttribute(type));
}
