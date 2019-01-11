import { IInitializerAttribute } from './IAttribute';
import { IInitializer } from './IInitializer';
import { LazyClassInitializer } from '../Compiler/Initializer/LazyClassInitializer';
import { Resolve } from './Resolver/Resolve';

/**
 * This attribute is for agent / domain management
 */
export class AgentAttribute implements IInitializerAttribute {
  beforeDecorate(target: Function): boolean {
    return true;
  }

  get initializer(): IInitializer {
    return Resolve(LazyClassInitializer);
  }
}
