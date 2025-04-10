import { set } from './Helpers/set';
import { Knowledge } from './Knowledge';

const memory = Knowledge.get(Knowledge);

export function GetMemory(id: string): any {
  return memory.get(id);
}

export function SetMemory(id: string, value: any): void {
  memory.set(id, value);
}

/**
 * Manually cache and retrieve a value for a property.
 * Will also patch the property with the resolved value.
 */
export function Remember<T>(
  key: string,
  target: object | Function,
  prop: string | symbol,
  compute: () => T
): T {

  const id = key + '.' + String(prop);

  const cached = memory.get(id);
  if (cached !== undefined) {

    return set(target, prop, cached) as T;
  }

  const resolved = compute();
  memory.set(id, resolved);
  return set(target, prop, resolved);
}
