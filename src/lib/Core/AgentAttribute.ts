import { IAttribute } from './IAttribute';
import { IInitializer } from './IInitializer';
import { ICompiler } from './ICompiler';
import { AgentCompiler } from '../Compiler/AgentCompiler';
import { AgentFramework } from './AgentFramework';
import { ClassInitializer } from '../Compiler/Initializer/ClassInitializer';

/**
 * This attribute is for agent / domain management
 */
export class AgentAttribute implements IAttribute {
  get compiler(): ICompiler {
    return AgentFramework.GetSingleton(AgentCompiler);
  }

  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
    if (typeof target !== 'function') {
      throw new TypeError('Unable to decorate agent for non-function type');
    }

    // throw TypeError if agent attribute already decorated
    if (AgentFramework.Constructors.has(target)) {
      const originalType = AgentFramework.Constructors.get(target);
      if (originalType) {
        throw new TypeError(`Unable to decorate multiple agent for class` + ` '${originalType!.name}'`);
      }
    }

    return true;
  }

  get initializer(): IInitializer {
    return AgentFramework.GetSingleton(ClassInitializer);
  }
}
