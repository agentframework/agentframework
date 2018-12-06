/**
 * AgentFeatures
 */

/**
 * AgentCompileType
 */
export enum AgentCompileType {
  Custom          = 0,
  StaticFunction  = 1,
  StaticClass     = 2,
  StaticProxy     = 3,
  LazyFunction    = 21,
  LazyClass       = 22,
  LazyProxy       = 23,
  DynamicFunction = 31,
  DynamicClass    = 32,
  DynamicProxy    = 33
}

export enum AgentFeatures {
  Disabled        = 0,
  Initializer     = 1,
  Interceptor     = 2,
  Constructor     = 4,
  LazyInitializer = 8
}

/**
 * CompilerOptions
 */
export interface CompilerOptions {
  features: AgentFeatures;
  target: 'function' | 'class' | 'proxy';
}
