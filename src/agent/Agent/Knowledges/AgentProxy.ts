import { Remember } from '../Decorators/Remember/Remember';

/**
 * Get Constructor for agent
 */
export class AgentProxy {
  // key: class name, value: Constructor
  static get v1() {
    return Remember('AgentConstructors', this, 'v1', () => new Map<string, Function>());
  }
}

/**
 *  Performance test result shows the cached function has the best performance than native code
 *  cache function by id. id is the primary key
 */
export function GetAgentProxy(agent: string): Function {
  let ctor = AgentProxy.v1.get(agent);
  if (!ctor) {
    ctor = Function(
      `$${agent}`,
      'a',
      `class ${agent} extends $${agent}{\nconstructor(...p){` +
      `return a.construct($${agent},p,new.target,${agent},${agent}$);\n}\n}` +
      `class ${agent}$ extends ${agent} { /* [generated code] */ };` +
      `return ${agent}$;`
    );
    AgentProxy.v1.set(agent, ctor);
  }
  return ctor;
}
