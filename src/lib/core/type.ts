import { InMemoryRegistry, IRegistry } from "./Registry";

/**
 * Filters the classes represented in an array of Type objects.
 */
export interface TypeFilter {
  (value: Type, index: number, array: Type[]): boolean;
}

export class Type {

}

export const Registry: IRegistry = new InMemoryRegistry();
