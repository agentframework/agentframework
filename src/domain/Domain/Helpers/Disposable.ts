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

export interface Disposable {
  /**
   * Return true if this domain been disposing
   */
  readonly disposing?: boolean;

  /**
   * Return true if this domain been disposed
   */
  readonly disposed?: boolean;

  /**
   * Dispose domain and release all agents
   */
  dispose?(): void;
}

// export function IsDisposable(type: undefined | Disposable): type is object & Disposable {
//   if (type && typeof type === 'object' && type['dispose'] && typeof type['dispose'] === 'function') {
//     return true;
//   }
//   return false;
// }
