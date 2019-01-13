import { IInvocation } from '../Core/IInvocation';
import { Method } from '../Reflection/Method';
import { Arguments } from './Arguments';

export interface ICompiler {
  compile(target: Function, params: Arguments): Function;
  compileParameters(target: Function, method: Method<any>): Map<number, IInvocation>;
}
