import { Reflection } from './reflection';
import { IsUndefined } from './utils';

// createGetterInterceptor a unique, global symbol name
// -----------------------------------
const key = Symbol.for('agent.framework.metadata');

// check if the global object has this symbol
// add it if it does not have the symbol, yet
// ------------------------------------------
const globalSymbols = Object.getOwnPropertySymbols(global);

// ensure all version using the same instance
if (globalSymbols.indexOf(key) === -1) {
  Reflect.set(global, key, new Map<Object | Function, Map<string | symbol, Reflection>>()); // Object.freeze(kernel); - this will break istanbul test
}

export class Metadata {

  private static _metadata: Map<Object | Function, Map<string | symbol, Reflection>> = Reflect.get(global, key);
  private static _empty: Map<string | symbol, Reflection> = new Map<string | symbol, Reflection>();

  public static getAll(target: Object | Function): Map<string | symbol, Reflection> {
    if (this._metadata.has(target)) {
      return this._metadata.get(target);
    }
    else {
      return this._empty;
    }
  }

  public static get(target: Object | Function, method?: string | symbol): Reflection {
    if (this._metadata.has(target)) {
      return this._metadata.get(target).get(IsUndefined(method) ? '' : method);
    }
    else {
      const proto = Object.getPrototypeOf(target);
      if (proto && this._metadata.has(proto)) {
        return this._metadata.get(proto).get(IsUndefined(method) ? '' : method);
      }
      else {
        return null;
      }
    }
  }

  public static getOwn(target: Object | Function, method?: string | symbol): Reflection {
    if (this._metadata.has(target)) {
      return this._metadata.get(target).get(IsUndefined(method) ? '' : method);
    }
    else {
      return null;
    }
  }

  public static saveOwn(reflection: Reflection, target: Object | Function, method?: string | symbol) {
    if (!this._metadata.has(target)) {
      this._metadata.set(target, new Map<string | symbol, Reflection>());
    }
    this._metadata.get(target).set(IsUndefined(method) ? '' : method, reflection);
  }

}
