import { decorateClassMethod } from '../core/decorator';
import { IAttribute } from '../core/attribute';
import { IInterceptor } from '../core/interceptor';
import { IInvocation } from '../core/invocation';


/**
 * Define a cache
 * @returns {(target:any, propertyKey:string, descriptor:PropertyDescriptor)=>undefined}
 */
export function cache(expires?: number) {
  return decorateClassMethod(new CacheAttribute(expires));
}

/**
 * PrerequisiteAttribute
 */
export class CacheAttribute implements IAttribute, IInterceptor {

  cache;

  static normalizeParameters(parameters: ArrayLike<any>): string {
    return Array.from(parameters).map(value => value.toString()).join('|');
  }

  constructor(expires?: number) {
    this.cache = new MemoryCache(expires || 60000);
  }

  getInterceptor(): IInterceptor {
    return this;
  }

  intercept(invocation: IInvocation, parameters: ArrayLike<any>): any {
    const normalized = CacheAttribute.normalizeParameters(parameters);
    const hit = this.cache.get(normalized);
    if (hit != null) {
      return hit;
    }
    const result = invocation.invoke(parameters);
    this.cache.set(normalized, result);
    return result;
  }
}

export class MemoryCache {
  expires: number = 60000;
  store: Map<string, ICached> = new Map<string, ICached>();

  constructor(expires: number) {
    this.expires = expires;
  }

  set(key: string, value: any) {
    this.store.set(key, { expires: Date.now() + this.expires, value });
  }
  get(key: string): any | null {
    if (this.store.has(key)) {
      const cached = this.store.get(key);
      if (cached.expires > Date.now()) {
        return cached.value;
      }
      else {
        this.store.delete(key);
      }
    }
    return null;
  }
}

export interface ICached {
  expires: number,
  value: any;
}
