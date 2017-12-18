export const REFLECTION_KEY = Symbol.for('agent.framework.reflection');
export const ORIGIN_INSTANCE = Symbol.for('agent.framework.origin.instance');
export const ORIGIN_CONSTRUCTOR = Symbol.for('agent.framework.origin.constructor');
export const AGENT_CONSTRUCTOR = Symbol.for('agent.framework.agent.constructor');
export const PROXY_PROTOTYPE = Symbol.for('agent.framework.proxy.prototype');
export const INTERCEPTED_CONSTRUCTOR = Symbol.for('agent.framework.interceptor.constructor');
export const AGENT_DOMAIN = Symbol.for('agent.framework.domain');

// Compiled Agent
export const FIELD_INITIALIZER = Symbol.for('agent.framework.member.initializer');
export const CONSTRUCTOR_INITIALIZER = Symbol.for('agent.framework.constructor.initializer');
