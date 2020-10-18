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

import {
  ClassInvocation,
  PropertyInvocation,
  ParameterInvocation
} from './TypeInvocations';
import { Interceptor } from './Interceptor';
import { Arguments } from './Arguments';

export interface ClassInterceptor extends Interceptor {
  intercept(target: ClassInvocation, params: Arguments, receiver: any): any;
}

export interface PropertyInterceptor extends Interceptor {
  intercept(target: PropertyInvocation, params: Arguments, receiver: any): any;
}

export interface ParameterInterceptor extends Interceptor {
  intercept(target: ParameterInvocation, params: Arguments, receiver: any): any;
}
//
// export interface FieldInterceptor extends Interceptor {
//   intercept(target: FieldInvocation, params: Arguments, receiver: any): any;
// }
//
// export interface MethodInterceptor extends Interceptor {
//   intercept(target: MethodInvocation, params: Arguments, receiver: any): any;
// }
