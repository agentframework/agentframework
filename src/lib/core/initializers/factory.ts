import { GetInitializer, IAttribute } from '../attribute';
import { IInvocation} from '../invocation';
import { InitializerInvocation, ValueInitializerInvocation } from './invocation';

export function createInitializationChainFromAttribute(origin: IInvocation, attributes: Array<IAttribute>): IInvocation {
  
  let invocation: IInvocation = origin;
  
  // make invocation chain of interceptors
  for(const attribute of attributes) {
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
                                       propertyKey: PropertyKey): IInvocation {
    const invocation = new ValueInitializerInvocation(target, propertyKey);
    return createInitializationChainFromAttribute(invocation, attributes);
  }
  
}


