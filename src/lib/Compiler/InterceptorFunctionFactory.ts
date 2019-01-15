import { DirectMethodInvocation, InterceptedMethodInvocation } from './Invocation/MethodInvocations';
import { IInvocation } from '../Core/IInvocation';
import { IAttribute } from '../Core/IAttribute';
import { Method } from '../Reflection/Method';
import { Property } from '../Reflection/Property';
import { InterceptorChainFactory } from './InterceptorChainFactory';

/**
 * @ignore
 * @hidden
 */
export class InterceptorFunctionFactory {

  static createFunction(
    attributes: Array<IAttribute>,
    target: Function,
    method: Function,
    design: Method<Property>,
    params?: Map<number, IInvocation>
  ): Function {
    let origin: IInvocation, factory: Function;
    if (params && params.size) {
      origin = new InterceptedMethodInvocation(target, method, design, params);
      factory = new Function('c', 'o', `return function ${method.name}$(){return o.target=this,c.invoke(arguments)}`);
    } else {
      origin = new DirectMethodInvocation(target, method, design);
      factory = new Function('c', 'o', `return function(){return o.target=this,c.invoke(arguments)}`);
    }
    const chain = InterceptorChainFactory.chainInterceptorAttributes(origin, attributes);
    if (chain instanceof DirectMethodInvocation) {
      // do nothing
      return method;
    } else {
      return factory(chain, origin);
    }
  }
}
