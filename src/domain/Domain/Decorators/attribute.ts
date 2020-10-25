import { DomainKnowledge } from '../DomainKnowledge';

/**
 * extensible attribute
 */
function AttributeDecorator<T extends Function>(target: T): T {
  const uuid = `attribute://${target.name}`;
  const type = DomainKnowledge.GetExtensible<T>(uuid);
  if (!type) {
    DomainKnowledge.SetExtensible(uuid, target);
    // Reflector(target).addAttribute(new ExtensibleAttribute());
    return target;
  }
  return type;
}

export function attribute(): ClassDecorator {
  return AttributeDecorator;
}
