/*********************************************************************
 *   (Stability: 2 - Stable) Annotation
 *********************************************************************/
export { Type } from './Core/Type';
export { Property } from './Core/Property';
export { Parameter } from './Core/Parameter';
export { Annotation } from './Core/Annotation';

/*********************************************************************
 *   (Stability: 2 - Stable) Annotation API
 *********************************************************************/
export { AddAttributeToProperty } from './Core/AddAttribute';
export { AddAttributeToPropertyParameter } from './Core/AddAttribute';
export { AddAttributeToConstructorParameter } from './Core/AddAttribute';
export { AddAttributeToConstructor } from './Core/AddAttribute';

export { GetConstructorAnnotation } from './Core/GetAnnotation';
export { GetPropertyAnnotation } from './Core/GetAnnotation';
export { GetAnnotation } from './Core/GetAnnotation';

/*********************************************************************
 *    (Stability: 2 - Stable): Memory API
 *********************************************************************/
export { Remember, SetMemory, GetMemory } from './Core/Memory';

/*********************************************************************
 *    (Stability: 2 - Stable): Internal Helper Function
 *********************************************************************/
export { DefineValue } from './Core/Object/DefineValue';
export { DefineIfValue } from './Core/Object/DefineIfValue';

/*********************************************************************
 *    (Stability: 1 - Experimental): TSLIB integrate with Metadata
 *********************************************************************/
// export { __esDecorate } from './Core/__esDecorate';
// export { __runInitializers } from './Core/__runInitializers';
