import { IAttribute } from './IAttribute';
import { IInitializer } from './IInitializer';
import { ClassInitializer } from '../Compiler/Initializer/ClassInitializer';
import { Agents } from './Cache';
import { Resolve } from './Resolver/Resolve';

/**
 * This attribute is for agent / domain management
 */
export class AgentAttribute implements IAttribute {
  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
    return !Agents.has(target);
  }

  get initializer(): IInitializer {
    return Resolve(ClassInitializer);
  }
}
