import { DefineValue } from './Object/DefineValue.ts';
import { Knowledge } from './Knowledge.ts';

// unique memory map
const MemoryStore: Map<string, unknown> = Knowledge.get(Knowledge);

export function GetMemory(id: string): unknown {
  return MemoryStore.get(id);
}

export function SetMemory(id: string, value: unknown): void {
  MemoryStore.set(id, value);
}

/**
 * Manually cache and retrieve a value for a property.
 * Will also patch the property with the resolved value.
 */
export function Remember<T>(key: string, target: object | Function, prop: string | symbol, compute: () => T): T {
  const id = `${key}.${String(prop)}`;

  const memory = MemoryStore.get(id);
  if (memory !== undefined) {
    return DefineValue(target, prop, memory) as T;
  }

  const resolved = compute();
  if (resolved !== undefined) {
    MemoryStore.set(id, resolved);
    DefineValue(target, prop, resolved);
  }
  return resolved;
}
