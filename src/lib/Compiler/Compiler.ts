import { TypedConstructor } from '../Core/TypedConstructor';
import { IInvocation } from '../Core/IInvocation';

/**
 * Generate custom class
 */
export class Compiler<T> {
  // private readonly targetName: string;
  private readonly generated: TypedConstructor<T>;
  // private readonly generatedName: string;

  constructor(private target: TypedConstructor<T>) {
    // this.targetName = this.target.name;
    // this.generatedName = this.target.name + '$';
    this.generated = this.target;
    // this.generated = new Function(this.targetName, `return class ${this.generatedName} extends ${this.targetName} {}`)(
    //   this.target
    // );
  }

  defineFields(fields: Map<PropertyKey, IInvocation>, params: () => ArrayLike<any>) {
    // invoke all initializers to generate default value bag
    if (fields && fields.size) {
      // bag = new Map<string, any>();
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
          }
        });
      }
    }
  }

  defineProperties(properties: Map<PropertyKey, PropertyDescriptor>) {
    if (properties && properties.size) {
      // bag = new Map<string, any>();
      for (const [key, descriptor] of properties) {
        Object.defineProperty(this.generated.prototype, key, descriptor);
      }
    }
  }

  compile(): TypedConstructor<T> {
    return this.generated;
  }
}
