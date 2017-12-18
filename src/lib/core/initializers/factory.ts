import { GetInitializer, IAttribute } from '../attribute';
import { IInvocation } from '../invocation';
import { InitializerInvocation, ParameterInvocation, ValueInvocation } from './invocation';
import { IDesign } from '../design';

export function createInitializationChainFromAttribute(origin: IInvocation, attributes: Array<IAttribute>): IInvocation {
  
  let invocation: IInvocation = origin;
  
  // make invocation chain of interceptors
  for (const attribute of attributes) {
    const initializer = GetInitializer(attribute);
    if (initializer) {
      invocation = new InitializerInvocation(invocation, initializer);
    }
  }
  
  return invocation;
}


export class InitializerFactory {
  
  public static createValueInitializer(attributes: Array<IAttribute>,
                                       target: any,
                                       propertyKey: PropertyKey,
                                       design: IDesign): IInvocation {
    const invocation = new ValueInvocation(target, propertyKey, design);
    return createInitializationChainFromAttribute(invocation, attributes);
  }
  
  public static createParameterInitializer(attributes: Array<IAttribute>,
                                           defaultValue: any,
                                           design: IDesign): IInvocation {
    const invocation = new ParameterInvocation(defaultValue, design);
    return createInitializationChainFromAttribute(invocation, attributes);
  }
  
}


