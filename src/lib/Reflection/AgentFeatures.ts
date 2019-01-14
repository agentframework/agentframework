export enum AgentFeatures {
  /**
   * has nothing
   */
  None = 0,

  /**
   * has metadata
   */
  Metadata = 1,

  /**
   * has initializer
   */
  Initializer = 2,

  /**
   * has interceptor
   */
  Interceptor = 4,

  /**
   * has initializer or interceptor
   */
  Altered = 6
}

// export function hasFeature(features: AgentFeatures, check: AgentFeatures): boolean {
//   return (features & check) === check;
// }
