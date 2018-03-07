import { IInvocation } from '../invocation';
import { InitializerFactory } from './factory';
import { InitializerInvocation } from './invocation';
import { createInterceptionChainFromAttribute } from '../interceptors/factory';
import { InterceptorInvocation } from '../interceptors/invocation';
import { Lookup } from '../lookup';
import { Property } from '../reflection';


// We don't create a property bag here because we want pass current new(arguments) to the initializer
// so that initializer can access the construction arguments
export function CreatePropertyInitializers(target: any): Map<string | symbol, IInvocation> {

  const initializers: Property[] = Lookup.findInitializers(target);
  let propertyInitializers: Map<string | symbol, IInvocation>;

  if (initializers.length > 0) {

    propertyInitializers = new Map<string, IInvocation>();

    for (const property of initializers) {

      const name = property.targetKey;

      if (property.descriptor) {
        throw new Error(`Class: ${target.prototype.constructor.name}; Property: ${property.targetKey}; Initializer not work with field property`);
      }
      else {

        let initializerAttributes = property.getInitializers();
        initializerAttributes = property.value().getInitializers().concat(initializerAttributes);

        // one property may have more than one interceptor.
        // we will call them one by one. passing the result of previous interceptor to the new interceptor
        const initialized = InitializerFactory.createValueInitializer(initializerAttributes, target, name, property);

        let interceptorAttributes = property.getInterceptors();
        interceptorAttributes = property.value().getInterceptors().concat(interceptorAttributes);

        // apply interceptors
        const intercepted = createInterceptionChainFromAttribute(initialized, interceptorAttributes);

        // InceptionInvocation means at least one interceptor in the attributes
        // do nothing if no interceptor found
        if (intercepted instanceof InitializerInvocation || intercepted instanceof InterceptorInvocation) {
          propertyInitializers.set(name, intercepted);
        }
      }

    }
  }

  return propertyInitializers;
}
