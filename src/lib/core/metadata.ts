import { Reflection } from './reflection';
import { IsUndefined } from './utils';

export class Metadata {

  static EMPTY_METADATA = new Map<string | symbol, Reflection>();

  constructor(private _metadata = new Map<Object | Function, Map<string | symbol, Reflection>>()) {
  }

  public get metadata() {
    return this._metadata;
  }

  public getAll(target: Object | Function): Map<string | symbol, Reflection> {
    if (this.metadata.has(target)) {
      return this.metadata.get(target);
    }
    else {
      return Metadata.EMPTY_METADATA;
    }
  }

  public get(target: Object | Function, method?: string | symbol): Reflection {
    if (this.metadata.has(target)) {
      return this.metadata.get(target).get(IsUndefined(method) ? '' : method);
    }
    else {
      const proto = Object.getPrototypeOf(target);
      if (proto && this.metadata.has(proto)) {
        return this.metadata.get(proto).get(IsUndefined(method) ? '' : method);
      }
      else {
        return null;
      }
    }
  }

  public getOwn(target: Object | Function, method?: string | symbol): Reflection {
    if (this.metadata.has(target)) {
      return this.metadata.get(target).get(IsUndefined(method) ? '' : method);
    }
    else {
      return null;
    }
  }

  public saveOwn(reflection: Reflection, target: Object | Function, method?: string | symbol) {
    if (!this.metadata.has(target)) {
      this.metadata.set(target, new Map<string | symbol, Reflection>());
    }
    this.metadata.get(target).set(IsUndefined(method) ? '' : method, reflection);
  }

}
