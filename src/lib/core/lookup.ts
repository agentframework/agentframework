import { Reflection } from './reflection';
import { Agent } from '../agent';
import { Metadata } from './metadata';
import { IAttribute } from './attribute';
import { IsFunction, GetPrototypeArray } from './utils';

export class Lookup {

  /**
   * Find one type of attribute
   * @param {Agent} typeOrInstance
   * @param attributeType
   * @returns {Map<string, Array<A extends IAttribute>>}
   */
  static attributes<A extends IAttribute>(typeOrInstance: Agent, attributeType?): Map<string, Array<A>> {

    let map = new Map<string, Array<A>>();

    const prototypes = GetPrototypeArray(typeOrInstance);

    prototypes.reverse().forEach(proto => {

      const reflections = Metadata.getAll(proto);

      // register all params config or middleware config
      reflections.forEach((reflection: Reflection, methodName: string) => {

        const attrs = reflection.getAttributes<A>(attributeType);
        map.set(methodName, reflection.getAttributes<A>(attributeType));

      });

    });

    return map;

  }

}
