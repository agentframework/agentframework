import { AgentAttribute } from './AgentAttribute';
import { IInvocation } from './IInvocation';
import { Arguments } from './Arguments';
import { Method } from './Reflection/Method';

export interface ICompiler {
  compile(target: any, agent: AgentAttribute, params: Arguments): any;
  compileParameters(method: Method<any>): Map<number, IInvocation>;
}
