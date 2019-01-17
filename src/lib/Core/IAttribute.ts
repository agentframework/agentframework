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

import { IInitializer } from './IInitializer';
import { IInterceptor } from './IInterceptor';

export interface IAttribute {

  /**
   * Get initializer for current target
   */
  readonly initializer?: IInitializer;

  /**
   * Get interceptor for current target
   */
  readonly interceptor?: IInterceptor;
  /**
   * Before decoration hook. Return false to stop decorate this attribute to a class
   *
   * @param {Object | Function} target
   * @param {string | Symbol} key
   * @param {PropertyDescriptor} descriptor
   * @returns {boolean}
   */
  beforeDecorate(target: Object | Function, key?: string | symbol, descriptor?: PropertyDescriptor | number): boolean;
}

export interface IInterceptorAttribute extends IAttribute {
  readonly interceptor: IInterceptor;
}

export interface IInitializerAttribute extends IAttribute {
  readonly initializer: IInitializer;
}
