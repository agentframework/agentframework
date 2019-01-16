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

import { IInitializerAttribute } from '../Core/IAttribute';
import { IInitializer } from '../Core/IInitializer';
import { LazyClassInitializer } from './Initializer/LazyClassInitializer';
import { Resolve } from '../Internal/Resolve';

/**
 * This attribute is for agent / domain management
 */
export class AgentAttribute implements IInitializerAttribute {
  beforeDecorate(target: Function): boolean {
    return true;
  }

  get initializer(): IInitializer {
    return Resolve(LazyClassInitializer);
  }
}
