import { IsString, IsUndefined } from '../utils';
import { Reflection } from '../reflection';
import { InterceptorFactory } from '../interceptor';

/**
 * Add prototype interceptor (es5 and before)
 * This method modifying old school PropertyDescriptor to implement interceptor.
 * @param target
 * @returns {Constructor}
 * @constructor
 */
export function AddPrototypeInterceptor<Constructor extends Function>(target: Constructor): void {

  // get the prototype of function
  const keys = Reflect.ownKeys(target.prototype)
    .filter(key => key !== 'constructor')
    .filter(key => IsString(key))
    .filter(key => Reflection.hasAttributes(target.prototype, key));

  // console.log('hooking', target.name, keys);

  const propertyDescriptors = keys
    .map(key => {
      const descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
      const attributes = Reflection.getAttributes(target.prototype, key);

      // property (function or field)
      if (!IsUndefined(descriptor.value)) {
        descriptor.value = InterceptorFactory.createFunctionInterceptor(attributes, descriptor.value);
      }
      
      // getter
      if (!IsUndefined(descriptor.get)) {
        descriptor.get = InterceptorFactory.createFunctionInterceptor(attributes, descriptor.get);
      }
      
      // setter
      if (!IsUndefined(descriptor.set)) {
        descriptor.set = InterceptorFactory.createFunctionInterceptor(attributes, descriptor.set);
      }

      return { key, descriptor };

    }).reduce((map, item) => {
      map[item.key] = item.descriptor;
      return map;
    }, {});

  Object.defineProperties(target.prototype, propertyDescriptors);

}
