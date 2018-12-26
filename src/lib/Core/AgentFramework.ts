import { Type } from './Reflection/Type';
import { TypedConstructor } from './TypedConstructor';
import { GetConstructors, GetSingletons, GetTypes } from './Cache';

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

  static get Constructors(): WeakMap<Function, Function> {
    const value = GetConstructors();
    Reflect.defineProperty(AgentFramework, 'Constructors', { value });
    return value;
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
