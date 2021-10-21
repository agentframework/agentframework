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

import { Initializer } from './Initializer';
import { AddAttributeToClass } from '../../../../dependencies/core';
import { InitializerAttribute } from './InitializerAttribute';
import { StaticInitializerAttribute } from './StaticInitializerAttribute';

export function initializable(): ClassDecorator {
  return (type: Function): void => {
    // NOTE: Design pattern: Factory method
    // InitializerAttribute must before StaticInitializerAttribute
    AddAttributeToClass(new InitializerAttribute(Initializer), type.prototype);
    AddAttributeToClass(new StaticInitializerAttribute(Initializer), type.prototype);
  };
}
