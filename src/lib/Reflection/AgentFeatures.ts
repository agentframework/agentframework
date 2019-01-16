/* Copyright 2016 Ling Zhang

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

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
