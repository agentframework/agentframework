import { IInvocation } from '../Core/IInvocation';
import { Method } from '../Reflection/Method';
import { Arguments } from './Arguments';

export interface ICompiler {
  compile<C extends Function>(target: Function, params: Arguments): C;
  compileParameters(target: Function, method: Method<any>): Map<number, IInvocation>;
}
