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

// /**
//  * Convert a type to agent
//  */
// export function Agent<T extends object>(target: Constructor<T>): Constructor<T> {
//   // the attributes to initialize agent constructor
//   // current only support only one initializer, multiple interceptors
//   // make sure one attribute for one target
//   return CreateAgent(target);
// }

import { CreateAndRegisterDomainAgent } from '../DomainAgent/CreateAndRegisterDomainAgent';
import { GetDomainAgent } from '../DomainAgent/GetDomainAgent';
import { RegisterDomainAgentAttribute } from '../DomainAgent/RegisterDomainAgentAttribute';
import { GetGlobalDomain } from '../Helpers/GetGlobalDomain';

/**
 * Define an agent
 */
export function agent(): ClassDecorator {
  return <F extends Function>(target: F): F => {
    const domain = GetGlobalDomain();
    // todo: should we call getType here?
    const type = domain.getType(target) || target;
    // note: type always exists, domain may not exists. so use type as 1st key
    const found = GetDomainAgent(domain, type);
    if (found) {
      return found;
    }
    // call RegisterDomainAgentAttribute to register agent instance into Domain
    return CreateAndRegisterDomainAgent(domain, type, new RegisterDomainAgentAttribute(domain), 1);
  };
}
