import { Reflection } from '../reflection';
import { IAttribute } from '../attribute';
import { InterceptorFactory } from './factory';


export function CreatePropertyInterceptors(target: any): PropertyDescriptorMap {

  const reflections: Map<string, Reflection> = Reflection.findInterceptors(target);
  let propertyInterceptors: PropertyDescriptorMap;

  if (!reflections.size) {
    return;
  }

  propertyInterceptors = {};

  for (const [key, reflection] of reflections) {

    const attributes = reflection.getAttributes<IAttribute>();
    const descriptor = reflection.descriptor;

    if (!descriptor) {
      continue;
    }

    propertyInterceptors[key] = Object.create(descriptor);

    const value = reflection.descriptor.value;
    const getter = reflection.descriptor.get;
    const setter = reflection.descriptor.set;

    if (value) {
      if (typeof value === 'function') {
        propertyInterceptors[key].value = InterceptorFactory.createFunctionInterceptor(attributes, value);
      }
      else {
        throw new Error(`Class: ${target.prototype.constructor.name}; Property: ${reflection.targetKey}; Unable to decorate Interceptor on field property.`)
      }
    }

    if (typeof getter === 'function') {
      propertyInterceptors[key].get = InterceptorFactory.createFunctionInterceptor(attributes, getter) as () => any;
    }

    if (typeof setter === 'function') {
      propertyInterceptors[key].set = InterceptorFactory.createFunctionInterceptor(attributes, setter) as (v: any) => void;
    }

  }

  return propertyInterceptors;
}
