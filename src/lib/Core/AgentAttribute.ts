import { IAttribute } from './IAttribute';
import { IInitializer } from './IInitializer';
import { ClassInitializer } from '../Compiler/Initializer/ClassInitializer';
import { Agents} from './Cache';
import { Resolve } from './Resolver/Resolve';

/**
 * This attribute is for agent / domain management
 */
export class AgentAttribute implements IAttribute {
  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
    if (typeof target !== 'function') {
      throw new TypeError('Unable to decorate agent for non-function type');
    }

    // throw TypeError if agent attribute already decorated
    if (Agents.has(target)) {
      const originalType = Agents.get(target);
      if (originalType) {
        throw new TypeError(`Unable to decorate multiple agent for class` + ` '${originalType.name}'`);
      }
    }

    return true;
  }

  get initializer(): IInitializer {
    return Resolve(ClassInitializer);
  }
}
