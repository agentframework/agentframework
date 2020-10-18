import { Knowledge } from '../Knowledge';

/**
 * extensible attribute
 */
function ExtensibleDecorator<T extends Function>(target: T): T {
  const uuid = `class://${target.name}`;
  const type = Knowledge.GetExtensible<T>(uuid);
  if (!type) {
    Knowledge.SetExtensible(uuid, target);
    // Reflector(target).addAttribute(new ExtensibleAttribute());
    return target;
  }
  return type;
}

export function extensible(): ClassDecorator {
  return ExtensibleDecorator;
}
