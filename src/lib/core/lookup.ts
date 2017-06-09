import { Reflection } from './reflection';
import { Agent } from '../agent';
import { Metadata } from './metadata';
import { IAttribute } from './attribute';
import { IsFunction } from './utils';

export class Lookup {

  static attributes<A extends IAttribute>(typeOrInstance: Agent, attributeType?): Map<string, Array<A>> {

    let map = new Map<string, Array<A>>();

    const prototypes = [];

    let p = IsFunction(typeOrInstance) ? typeOrInstance.prototype : Reflect.getPrototypeOf(typeOrInstance);
    while (p) {
      prototypes.push(p);
      p = Reflect.getPrototypeOf(p);
    }

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
