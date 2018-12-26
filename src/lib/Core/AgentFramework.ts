import { Type } from './Reflection/Type';
import { TypedConstructor } from './TypedConstructor';
import { GetSingletons, GetTypes } from './Internal/Global';

export class AgentFramework {
  static Reflector(prototype: Object): Type {
    let found = AgentFramework.Types.get(prototype);
    if (!found) {
      found = new Type(prototype);
      AgentFramework.Types.set(prototype, found);
    }
    return found;
  }

  static GetSingleton<T>(type: TypedConstructor<T>, params?: ArrayLike<any>): T {
    let found = AgentFramework.Instances.get(type);
    if (found === undefined) {
      found = <T>Reflect.construct(type, params || []);
      AgentFramework.Instances.set(type, found);
    }
    return found;
  }

  private static get Types(): WeakMap<Object, Type> {
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
