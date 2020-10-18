import { Knowledge } from '../Knowledge';

/**
 * extensible attribute
 */
function AttributeDecorator<T extends Function>(target: T): T {
  const uuid = `attribute://${target.name}`;
  const type = Knowledge.GetExtensible<T>(uuid);
  if (!type) {
    Knowledge.SetExtensible(uuid, target);
    // Reflector(target).addAttribute(new ExtensibleAttribute());
    return target;
  }
  return type;
}

export function attribute(): ClassDecorator {
  return AttributeDecorator;
}
