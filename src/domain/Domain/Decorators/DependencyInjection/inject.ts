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

import { decorateVariable, VariableDecorator } from '../../../../dependencies/agent';
import { InjectAttribute } from './InjectAttribute';

/**
 * Inject an existing instance in current domain scope. will be `null` if no matching instance found.
 *
 * @param type
 */
export function inject(type?: Function): VariableDecorator {
  return decorateVariable(new InjectAttribute(type));
}
