import { IsString, IsUndefined } from '../utils';
import { Reflection } from '../reflection';
import { InterceptorFactory } from '../interceptor';
import { IInvocation } from '../invocation';
import { InceptionInvocation } from '../chain';
import { IAttribute } from '../attribute';

/**
 * Add prototype interceptor (es5 and before)
 * This method modifying old school PropertyDescriptor to implement interceptor.
 * @param target
 * @returns {Constructor}
 * @constructor
 */
// export function AddPrototypeInterceptor<Constructor extends Function>(target: Constructor): void {
//
//   // get the prototype of function
//   const keys = Reflect.ownKeys(target.prototype)
//     .filter(key => key !== 'constructor')
//     .filter(key => IsString(key))
//     .filter(key => Reflection.hasAttribute(target.prototype, key));
//
//   // console.log('hooking', target.name, keys);
//
//   const propertyDescriptors = keys
//     .map(key => {
//       const descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
//       const attributes = Reflection.getAttributes(target.prototype, key);
//
//       // property (function or field)
//       if (!IsUndefined(descriptor.value)) {
//         descriptor.value = InterceptorFactory.createFunctionInterceptor(attributes, descriptor.value);
//       }
//
//       // getter
//       if (!IsUndefined(descriptor.get)) {
//         descriptor.get = InterceptorFactory.createFunctionInterceptor(attributes, descriptor.get);
//       }
//
//       // setter
//       if (!IsUndefined(descriptor.set)) {
//         descriptor.set = InterceptorFactory.createFunctionInterceptor(attributes, descriptor.set);
//       }
//
//       return { key, descriptor };
//
//     }).reduce((map, item) => {
//       map[item.key] = item.descriptor;
//       return map;
//     }, {});
//
//   Object.defineProperties(target.prototype, propertyDescriptors);
//
// }

export function CreateMemberInterceptors(target: any) {
  
  const reflections: Map<string, Reflection> = Reflection.findInterceptors(target);
  let fieldInterceptors: Map<string, IInvocation>;
  let methodInterceptors: Map<string, IInvocation>;
  
  if (reflections.size > 0) {
    
    fieldInterceptors = new Map<string, IInvocation>();
    methodInterceptors = new Map<string, IInvocation>();
    
    for (const [key, reflection] of reflections) {
      
      const attributes = reflection.getAttributes<IAttribute>();
  
      if (reflection.descriptor) {
    
        // TODO: New feature, user can define IOverwritter to replace the origin function
        // build and invoke IOverwritter
        
      }
      else {
    
        // one property may have more than one interceptor.
        // we will call them one by one. passing the result of previous interceptor to the new interceptor
        const invocation = InterceptorFactory.createValueInterceptor(attributes, null, key);
    
        // InceptionInvocation means at least one interceptor in the attributes
        // do nothing if no interceptor found
        if (invocation instanceof InceptionInvocation) {
          fieldInterceptors.set(key, invocation);
        }
        
      }
    }
  }
  
  return {
    fieldInterceptors,
    methodInterceptors
  }
}
