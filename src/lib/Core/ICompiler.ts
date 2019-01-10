import { AgentAttribute } from './AgentAttribute';
import { IInvocation } from './IInvocation';
import { Method } from './Reflection/Method';

export interface ICompiler {
  compile(target: any, agent: AgentAttribute, params: ArrayLike<any>): any;
  compileParameters(method: Method<any>): Map<number, IInvocation>;
}
