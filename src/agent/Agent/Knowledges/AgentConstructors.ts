import { Remember } from '../Decorators/Remember/Remember';

/**
 * Get Constructor for agent
 */
export class AgentConstructors {
  // key: class name, value: Constructor
  static get v1() {
    return Remember('AgentConstructors', this, 'v1', () => new Map<string, Function>());
  }
}

/**
 *  Performance test result shows the cached function has the best performance than native code
 *  cache function by id. id is the primary key
 */
export function GetAgentConstructor(agent: string): Function {
  let ctor = AgentConstructors.v1.get(agent);
  if (!ctor) {
    ctor = Function(
      `$${agent}`,
      'c',
      `class ${agent} extends $${agent}{\nconstructor(...p){\nreturn c($${agent},${agent},${agent}$,p,new.target);\n}\n}` +
        `class ${agent}$ extends ${agent} { /* [generated code] */ };` +
        `return ${agent}$;`
    );
    AgentConstructors.v1.set(agent, ctor);
  }
  return ctor;
}
