// Attribute
export { IAttribute } from './Core/IAttribute';
export { IInterceptor } from './Core/IInterceptor';
export { IInitializer } from './Core/IInitializer';
export { IInvocation } from './Core/IInvocation';
export { AgentAttribute } from './Core/AgentAttribute';

// Decorator
export { Target, UniversalDecorator, decorate } from './Decorator/decorate';
export { decorateAgent } from './Decorator/decorateAgent';
export { decorateParameter } from './Decorator/decorateParameter';
export { decorateClass, decorateClassField, decorateClassMember, decorateClassMethod } from './Decorator/decorateClass';

// upgrade agent without @agent attribute
export { CreateAgent } from './Compiler/CreateAgent';

// Reflection
export { Reflector } from './Core/Reflector';
export { Reflection } from './Core/Reflection/Reflection';
export { Type } from './Core/Reflection/Type';
export { Property } from './Core/Reflection/Property';
export { Method } from './Core/Reflection/Method';
export { Parameter } from './Core/Reflection/Parameter';
export { PropertyFilters } from './Core/Reflection/PropertyFilters';

// Utils
export { Constructor } from './Core/Constructor';
export { TypedConstructor } from './Core/TypedConstructor';
export {
  IsObject,
  IsFunction,
  IsNullOrUndefined,
  IsObjectOrFunction,
  IsSymbol,
  IsString,
  IsNumber,
  IsEqual,
  ToPropertyKey,
  GetPrototypeArray,
  GetPrototypeArrayReverse
} from './Core/Utils';

export { agent } from './agent';
