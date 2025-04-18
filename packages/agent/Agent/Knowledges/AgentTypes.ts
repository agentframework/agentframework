import { Remember } from '@agentframework/core';

/**
 * Get Constructor for agent
 */
export class AgentTypes {
  // key: class name, value: Constructor
  static get v1() {
    return Remember('AgentTypes', this, 'v1', () => new Map<string, Function>());
  }
}

/**
 *  Performance test result shows the cached function has the best performance than native code
 *  cache function
 */
export function CreateAgentType(a: string): Function {
  let ctor = AgentTypes.v1.get(a);
  if (!ctor) {
    ctor = Function(
      'Reflect',
      `$${a}`,
      `class ${a} extends $${a} {\nconstructor(..._) {` +
        `return Reflect.construct($${a},_,new.target,${a},${a}$);\n}\n}` +
        `class ${a}$ extends ${a} { /* [generated agent] */ };` +
        `return ${a}$;`
    );
    AgentTypes.v1.set(a, ctor);
  }
  return ctor;
}
