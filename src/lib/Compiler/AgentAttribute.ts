import { IInitializerAttribute } from '../Core/IAttribute';
import { IInitializer } from '../Core/IInitializer';
import { AgentInitializer } from './Initializer/AgentInitializer';
import { Resolve } from '../Internal/Resolve';

/**
 * This attribute is for agent / domain management
 */
export class AgentAttribute implements IInitializerAttribute {
  beforeDecorate(target: Function): boolean {
    return true;
  }

  get initializer(): IInitializer {
    return Resolve(AgentInitializer);
  }
}
