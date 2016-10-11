import { IsString, IsUndefined } from '../utils';
import { Reflection } from '../reflection';
import { InterceptorFactory } from '../interceptor';

/**
 * Add prototype interceptor
 * @param target
 * @returns {Constructor}
 * @constructor
 */
export function AddPrototypeInterceptor<Constructor extends Function>(target: Constructor) {
  
  // get the prototype of function
  const keys = Reflect.ownKeys(target.prototype);
  
  const propertyDescriptors = keys
    .filter(key => key[0] !== '_')
    .filter(key => IsString(key))
    .filter(key => Reflection.hasAttributes(target.prototype, key))
    .map(key => {
      
      const descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
      const attributes = Reflection.getAttributes(target.prototype, key);
      
      if (!IsUndefined(descriptor.value)) {
        descriptor.value = InterceptorFactory.createFunctionInterceptor(attributes, descriptor.value);
      }
      if (!IsUndefined(descriptor.get)) {
        descriptor.get = InterceptorFactory.createFunctionInterceptor(attributes, descriptor.get);
      }
      if (!IsUndefined(descriptor.set)) {
        descriptor.set = InterceptorFactory.createFunctionInterceptor(attributes, descriptor.set);
      }
      
      return {key, descriptor};
      
    }).reduce((map, item) => {
      map[item.key] = item.descriptor;
      return map;
    }, {});
  
  Object.defineProperties(target.prototype, propertyDescriptors);
  
  return target;
}
