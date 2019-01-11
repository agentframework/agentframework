import { IInvocation } from './IInvocation';
import { Method } from './Reflection/Method';

export interface ICompiler {
  compile(target: any, params: ArrayLike<any>): any;
  compileParameters(method: Method<any>): Map<number, IInvocation>;
}
