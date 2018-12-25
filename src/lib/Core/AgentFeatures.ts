export enum AgentFeatures {
  /**
   * Metadata only
   */
  Disabled = 0,
  /**
   * Enable initializer
   */
  Initializer = 1,
  /**
   * Enable interceptor
   */
  Interceptor = 2,
  /**
   * Enable initializer & interceptor on constructor
   */
  Constructor = 4
}

export function hasFeature(features: AgentFeatures, check: AgentFeatures): boolean {
  return (features & check) === check;
}
