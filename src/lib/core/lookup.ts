import { Reflection } from './reflection';
import { Agent } from '../agent';
import { Metadata } from './metadata';
import { IAttribute } from './attribute';
import { IsFunction, GetPrototypeArray } from './utils';
import { isString } from 'util';

export class Lookup {

  public static findInterceptors(typeOrInstance: Agent): Map<string, Reflection> {

    const results = new Map<string, Reflection>();
    const prototypes = GetPrototypeArray(typeOrInstance);

    for (const proto of prototypes.reverse()) {
      const reflections = Metadata.getAll(proto);
      for (const [key, reflection] of reflections) {
        // property don't have a descriptor
        if (key && isString(key) && reflection.hasInterceptor()) {
          // reflection without descriptor must a field
          results.set(key, reflection);
        }
      }
    }

    return results;
  }

  public static findInitializers(typeOrInstance: Agent): Map<string, Reflection> {

    const results = new Map<string, Reflection>();
    const prototypes = GetPrototypeArray(typeOrInstance);

    for (const proto of prototypes.reverse()) {
      const reflections = Metadata.getAll(proto);
      for (const [key, reflection] of reflections) {
        // property don't have a descriptor
        if (key && isString(key) && reflection.hasInitializer()) {
          // reflection without descriptor must a field
          results.set(key, reflection);
        }
      }
    }

    return results;
  }

}
