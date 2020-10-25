import { DomainKnowledge } from '../DomainKnowledge';

/**
 * extensible attribute
 */
function ExtensibleDecorator<T extends Function>(target: T): T {
  const uuid = `class://${target.name}`;
  const type = DomainKnowledge.GetExtensible<T>(uuid);
  if (!type) {
    DomainKnowledge.SetExtensible(uuid, target);
    // Reflector(target).addAttribute(new ExtensibleAttribute());
    return target;
  }
  return type;
}

export function extensible(): ClassDecorator {
  return ExtensibleDecorator;
}
