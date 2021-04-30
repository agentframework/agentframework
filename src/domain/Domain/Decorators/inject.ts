import { decorateMember } from '../../../dependencies/core';
import { InjectAttribute } from '../Attributes/InjectAttribute';
import { AnyClass } from '../Class';

/**
 * Inject an existing instance in current domain scope. will be `null` if no matching instance found.
 *
 * @param type
 */
export function inject(type?: AnyClass): PropertyDecorator {
  return decorateMember(new InjectAttribute(type));
}
