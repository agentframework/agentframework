import { IInvocation } from '../Core/IInvocation';
import { IAttribute } from '../Core/IAttribute';
import { GetInitializer, HasInitializer } from './Internal/Utils';
import { InitializerInvocation } from './Invocation/InitializerInvocation';
import { ValueInvocation } from './Invocation/ValueInvocation';
import { ParameterInvocation } from './Invocation/ParameterInvocation';

/**
 * @ignore
 * @hidden
 */
export class InitializerFactory {
  //
  static createValueInitializer(
    attributes: Array<IAttribute>,
    target: any,
    propertyKey: PropertyKey,
    design: any
  ): IInvocation {
    const invocation = new ValueInvocation(target, propertyKey, design);
    return this.chainInitializerAttributes(invocation, attributes);
  }

  static createParameterInitializer(attributes: Array<IAttribute>, defaultValue: any, design: any): IInvocation {
    const invocation = new ParameterInvocation(defaultValue, design);
    return this.chainInitializerAttributes(invocation, attributes);
  }

  static chainInitializerAttributes(origin: IInvocation, attributes: Array<IAttribute>): IInvocation {
    // make invocation chain of interceptors
    for (const attribute of attributes) {
      if (HasInitializer(attribute)) {
        const initializer = GetInitializer(attribute);
        if (initializer) {
          origin = new InitializerInvocation(origin, initializer);
        }
      }
    }
    return origin;
  }
}
