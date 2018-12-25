import { Prototype } from './Reflection/Prototype';
import { Constructor } from './Constructor';
import { GetSingletons, GetTypes } from './Internal/Global';

export class AgentFramework {
  static Reflector(prototype: Object): Prototype {
    let found = AgentFramework.Types.get(prototype);
    if (!found) {
      found = new Prototype(prototype);
      AgentFramework.Types.set(prototype, found);
    }
    return found;
  }

  static GetSingleton<T>(type: Constructor<T>): T {
    let found = AgentFramework.Instances.get(type);
    if (found === undefined) {
      found = <T>Reflect.construct(type, []);
      AgentFramework.Instances.set(type, found);
    }
    return found;
  }

  private static get Types(): WeakMap<Object, Prototype> {
    const value = GetTypes();
    Reflect.defineProperty(AgentFramework, 'Types', { value });
    return value;
  }

  private static get Instances(): WeakMap<Function, any> {
    const value = GetSingletons();
    Reflect.defineProperty(AgentFramework, 'Instances', { value });
    return value;
  }
}
