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
// Core
export { IAttribute, IInitializerAttribute, IInterceptorAttribute } from './Core/IAttribute';
export { IInterceptor } from './Core/IInterceptor';
export { IInitializer } from './Core/IInitializer';
export { IInvocation } from './Core/IInvocation';
export { Constructor } from './Compiler/Constructor';

// Decorator
export { decorate, Target, UniversalDecorator } from './Decorator/decorate';
export { decorateAgent } from './Decorator/decorateAgent';
export { decorateParameter } from './Decorator/decorateParameter';
export { decorateClass, decorateClassField, decorateClassMember, decorateClassMethod } from './Decorator/decorateClass';

// Reflection
export { Member } from './Reflection/Member';
export { Type } from './Reflection/Type';
export { Property } from './Reflection/Property';
export { Method } from './Reflection/Method';
export { Parameter } from './Reflection/Parameter';
export { PropertyFilter, PropertyFilters } from './Reflection/PropertyFilters';
export { AgentFeatures } from './Reflection/AgentFeatures';

// Main API
export { AgentAttribute } from './Compiler/AgentAttribute';
export { Agent } from './agent';
export { agent } from './agent';
export { Reflector } from './Reflection/Reflector';

// Utils
export { IsAgent, GetType } from './Internal/Cache';
