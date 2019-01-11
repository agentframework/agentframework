import { IInvocation } from '../Core/IInvocation';
import { IAttribute } from '../Core/IAttribute';
import { InitializerInvocation } from './Invocation/InitializerInvocation';
import { ValueInvocation } from './Invocation/ValueInvocation';
import { ParameterInvocation } from './Invocation/ParameterInvocation';
import { Constructor } from '../Core/Constructor';

/**
 * @ignore
 * @hidden
 */
export class InitializerFactory {
  //
  static createValueInitializer(
    attributes: Array<IAttribute>,
    target: Constructor<any>,
    propertyKey: PropertyKey,
    design: any
  ): IInvocation {
    const invocation = new ValueInvocation(target.prototype, propertyKey, design);
    return this.chainInitializerAttributes(invocation, attributes);
  }

  static createParameterInitializer(attributes: Array<IAttribute>, defaultValue: any, design: any): IInvocation {
    const invocation = new ParameterInvocation(defaultValue, design);
    return this.chainInitializerAttributes(invocation, attributes);
  }

  static chainInitializerAttributes(origin: IInvocation, attributes: Array<IAttribute>): IInvocation {
    // make invocation chain of interceptors
    for (const attribute of attributes) {
      const initializer = attribute.initializer;
      if (initializer && 'function' === typeof initializer.initialize) {
        origin = new InitializerInvocation(origin, initializer);
      }
    }
    return origin;
  }
}
