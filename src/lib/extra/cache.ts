import { IAttribute, IInterceptor, IInvocation, decorateClassMethod } from '../core';

/**
 * Define a prerequisite
 * @returns {(target:any, propertyKey:string, descriptor:PropertyDescriptor)=>undefined}
 */
export function cache() {
  return decorateClassMethod(new CacheAttribute());
}

/**
 * PrerequisiteAttribute
 */
class CacheAttribute implements IAttribute, IInterceptor {

  cache = new MemoryCache();

  static normalizeParameters(parameters: ArrayLike<any>): string {
    return Array.from(parameters).map(value => value.toString()).join('|');
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

class MemoryCache {
  expires: number = 60000;
  store: Map<string, ICached> = new Map<string, ICached>();
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

interface ICached {
  expires: number,
  value: any;
}
