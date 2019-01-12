export enum AgentFeatures {
  MetadataOnly = 0,

  /**
   * Enable initializer
   */
  Initializer = 1,

  /**
   * Enable interceptor
   */
  Interceptor = 2
}

export function hasFeature(features: AgentFeatures, check: AgentFeatures): boolean {
  return (features & check) === check;
}
