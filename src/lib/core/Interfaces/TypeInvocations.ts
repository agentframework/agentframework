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

import { Invocation } from './Invocation';
import { TypeInfo } from './TypeInfo';
import { PropertyInfo } from './PropertyInfo';
import { ParameterInfo } from './ParameterInfo';

export interface ClassInvocation extends Invocation {
  /**
   * Get the design type
   */
  readonly design: TypeInfo;
}

export interface PropertyInvocation extends Invocation {
  /**
   * Get the design type
   */
  readonly design: PropertyInfo;
}

export interface ParameterInvocation extends Invocation {
  /**
   * Get the design type
   */
  readonly design: ParameterInfo;
}
//
// export interface MethodInvocation extends Invocation {
//   /**
//    * Get the design type
//    */
//   readonly design: PropertyInfo;
// }
//
// export interface FieldInvocation extends Invocation {
//   /**
//    * Get the design type
//    */
//   readonly design: PropertyInfo;
// }
