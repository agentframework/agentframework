import { IInvocation } from '../Core/IInvocation';
import { Arguments } from './Arguments';

/**
 * Generate custom class
 */
export class Compiler {
  private readonly generated: Function;

  constructor(private target: Function) {
    this.generated = this.target;
  }

  defineFields(fields: Map<PropertyKey, IInvocation>, params: Arguments) {
    // invoke all initializers to generate default value bag
    if (fields && fields.size) {
      for (const [key, initializer] of fields) {
        Object.defineProperty(this.generated.prototype, key, {
          get: function() {
            const value = initializer.invoke(params());
            Reflect.defineProperty(this, key, {
              value,
              configurable: true,
              enumerable: true,
              writable: true
            });
            return value;
          },
          set: function(value: any) {
            Reflect.defineProperty(this, key, {
              value,
              configurable: true,
              enumerable: true,
              writable: true
            });
          },
          configurable: true,
          enumerable: true
        });
      }
    }
  }

  defineProperties(properties: Map<PropertyKey, PropertyDescriptor>) {
    if (properties && properties.size) {
      for (const [key, descriptor] of properties) {
        Object.defineProperty(this.generated.prototype, key, descriptor);
      }
    }
  }

  compile(): Function {
    return this.generated;
  }
}
