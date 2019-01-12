import { IInvocation } from './IInvocation';
import { Method } from './Reflection/Method';
import { Constructor } from './Constructor';
import { Arguments } from './Arguments';

export interface ICompiler {
  compile<T>(target: Constructor<T>, params: Arguments): T;
  compileParameters(method: Method<any>): Map<number, IInvocation>;
}
