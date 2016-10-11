import { Reflection } from '../reflection';
import { InterceptorFactory } from '../interceptor';

export function AddConstructInterceptor<Constructor extends Function>(target: Constructor) {
  const typeProxyHandler = {
    construct: ConstructInterceptor
  };
  return new Proxy(target, typeProxyHandler);
}

function ConstructInterceptor<T>(target: T, argArray: ArrayLike<any>, receiver: any): any {
  
  const customAttributes = Reflection.getAttributes(target);
  
  // if (customAttributes.length > 1) {
  //   throw new TypeError('Not Support Multiple Agent Decoration');
  // }
  
  const invocation = InterceptorFactory.createConstructInterceptor(customAttributes, target, receiver);
  
  // return the new class constructor
  return invocation.invoke(argArray);
  
}
