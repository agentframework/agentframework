import { IInvocation } from './IInvocation';
import { Method } from './Reflection/Method';
import { IAttribute } from './IAttribute';

export interface ICompiler {
  compile(target: any, agent: IAttribute, params: ArrayLike<any>): any;
  compileParameters(method: Method<any>): Map<number, IInvocation>;
}
