import { IInvocation } from '../Core/IInvocation';
import { IAttribute } from '../Core/IAttribute';
import { Parameter } from '../Reflection/Parameter';
import { InitializerInvocation } from './Invocation/InitializerInvocation';
import { FieldInvocation } from './Invocation/FieldInvocation';
import { ParameterInvocation } from './Invocation/ParameterInvocation';
import { Property } from '../Reflection/Property';

/**
 * @ignore
 * @hidden
 */
export class InitializerFactory {
  //
  static createFieldInitializer(
    attributes: Array<IAttribute>,
    target: Function,
    propertyKey: PropertyKey,
    design: Property
  ): IInvocation {
    const invocation = new FieldInvocation(target, propertyKey, design);
    return this.chainInitializerAttributes(invocation, attributes);
  }

  static createParameterInitializer(
    attributes: Array<IAttribute>,
    target: Function,
    design: Parameter<any>
  ): IInvocation {
    const invocation = new ParameterInvocation(target, design);
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
