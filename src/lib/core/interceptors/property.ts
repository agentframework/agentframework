import { InterceptorFactory } from './factory';
import { Lookup } from '../lookup';
import { Property } from '../reflection';

/**
 * @ignore
 * @hidden
 * @param target
 * @returns {PropertyDescriptorMap}
 * @constructor
 */
export function CreatePropertyInterceptors(target: any): PropertyDescriptorMap {

  // 1. find all the properties for this type which contains one or more attribute implemented 'getInterceptor'
  const properties: Property[] = Lookup.findInterceptors(target);
  let propertyInterceptors: any;

  if (!properties.length) {
    return;
  }

  propertyInterceptors = {};

  for (const property of properties) {

    const name = property.targetKey;
    const descriptor = property.descriptor;

    if (!descriptor) {

      if (property.hasInitializer() || property.value().hasInitializer()) {
        // Interceptor can works with Initializer
        continue;
      }
      else {
        throw new Error(`Class: ${target.prototype.constructor.name}; Property: ${property.targetKey.toString()}; ` +
          `Interceptor not work with field property without Initializer`);
      }

    }

    // refer to the origin descriptor
    propertyInterceptors[name] = Object.create(descriptor);

    const value = property.descriptor.value;
    const getter = property.descriptor.get;
    const setter = property.descriptor.set;

    // find all the attributes
    let interceptorAttributes = property.getInterceptors();

    if (value) {

      // call interceptors on value first
      // then call interceptors on property
      interceptorAttributes = property.value().getInterceptors().concat(interceptorAttributes);

      /* istanbul ignore else  */
      if (typeof value === 'function') {
        propertyInterceptors[name].value = InterceptorFactory.createFunctionInterceptor(interceptorAttributes, value);
      }
      else {
        throw new Error(`Class: ${target.prototype.constructor.name}; Property: ${property.targetKey.toString()}; ` +
          `Interceptor not work with non-function property`);
      }
    }

    if (typeof getter === 'function') {
      interceptorAttributes = property.getter().getInterceptors().concat(interceptorAttributes);
      propertyInterceptors[name].get = InterceptorFactory.createFunctionInterceptor(interceptorAttributes, getter) as () => any;
    }

    if (typeof setter === 'function') {
      interceptorAttributes = property.setter().getInterceptors().concat(interceptorAttributes);
      propertyInterceptors[name].set = InterceptorFactory.createFunctionInterceptor(interceptorAttributes, setter) as (v: any) => void;
    }

  }

  return propertyInterceptors;
}
