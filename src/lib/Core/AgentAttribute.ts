import { IInitializerAttribute } from './IAttribute';
import { Agents } from './Cache';
import { IInitializer } from './IInitializer';
import { LazyClassInitializer } from '../Compiler/Initializer/LazyClassInitializer';
import { Resolve } from './Resolver/Resolve';

/**
 * This attribute is for agent / domain management
 */
export class AgentAttribute implements IInitializerAttribute {
  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
    return !Agents.has(target);
  }

  get initializer(): IInitializer {
    return Resolve(LazyClassInitializer);
  }
}
