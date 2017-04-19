import { Reflection } from './reflection';
import { Agent } from '../agent';
import { Metadata } from './metadata';
import { IAttribute } from './attribute';

export class Lookup {
  
  static attributes<A extends IAttribute>(type: Agent, attributeType?): Map<string, Array<A>> {
    
    let map = new Map<string, Array<A>>();
    
    const prototypes = [];
    
    let proto = type.prototype;
    while (proto) {
      prototypes.push(proto);
      proto = Reflect.getPrototypeOf(proto);
    }
    
    prototypes.reverse().forEach(proto => {
      
      const reflections = Metadata.getAll(proto);
      
      // register all params config or middleware config
      reflections.forEach((reflection: Reflection, methodName: string) => {
        
        map.set(methodName, reflection.getAttributes<A>(attributeType));
        
      });
      
    });
    
    return map;
    
  }
  
}
