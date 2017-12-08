import { IInvocation } from '../invocation';
import { Reflection } from '../reflection';
import { IAttribute } from '../attribute';
import { InitializerFactory } from './factory';
import { InitializerInvocation } from './invocation';
import { createInterceptionChainFromAttribute } from '../interceptors/factory';
import { InterceptorInvocation } from '../interceptors/invocation';


export function CreatePropertyInitializers(target: any): Map<string, IInvocation> {

  const reflections: Map<string, Reflection> = Reflection.findInitializers(target);
  let propertyInitializers: Map<string, IInvocation>;

  if (reflections.size > 0) {

    propertyInitializers = new Map<string, IInvocation>();

    for (const [key, reflection] of reflections) {

      const attributes = reflection.getAttributes<IAttribute>();

      if (reflection.descriptor) {
        throw new Error(`Class: ${target.prototype.constructor.name}; Property: ${reflection.targetKey}; Initializer can only decorate on field property.`);
      }
      else {
        // one property may have more than one interceptor.
        // we will call them one by one. passing the result of previous interceptor to the new interceptor
        const invocation = InitializerFactory.createValueInitializer(attributes, target, key);
        const intercepted = createInterceptionChainFromAttribute(invocation, attributes);

        // InceptionInvocation means at least one interceptor in the attributes
        // do nothing if no interceptor found
        if (intercepted instanceof InitializerInvocation || intercepted instanceof InterceptorInvocation) {
          propertyInitializers.set(key, intercepted);
        }
      }

    }
  }

  return propertyInitializers;
}
