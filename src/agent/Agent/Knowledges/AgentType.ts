import { Remember } from '../Decorators/Remember/Remember';

/**
 * Get Constructor for agent
 */
export class AgentType {
  // key: class name, value: Constructor
  static get v1() {
    return Remember('AgentType', this, 'v1', () => new Map<string, Function>());
  }
}

/**
 *  Performance test result shows the cached function has the best performance than native code
 *  cache function by id. id is the primary key
 */
export function GetAgentType(agent: string): Function {
  let ctor = AgentType.v1.get(agent);
  if (!ctor) {
    ctor = Function(
      'a',
      `$${agent}`,
      `class ${agent} extends $${agent}{\nconstructor(...p){` +
      `return a.construct(a,$${agent},p,new.target,${agent},${agent}$);\n}\n}` +
      `class ${agent}$ extends ${agent} { /* [generated agent] */ };` +
      `return ${agent}$;`
    );
    AgentType.v1.set(agent, ctor);
  }
  return ctor;
}
