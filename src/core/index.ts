/*********************************************************************
 *   (Stability: 2 - Stable) Annotation
 *********************************************************************/
export { Type } from './Core/Annotation/Type.ts';
export { Property } from './Core/Annotation/Property.ts';
export { Parameter } from './Core/Annotation/Parameter.ts';
export { Annotation } from './Core/Annotation/Annotation.ts';

/*********************************************************************
 *   (Stability: 2 - Stable) Annotation API
 *********************************************************************/
export { AddAttributeToProperty } from './Core/AddAttributeToProperty.ts';
export { AddAttributeToPropertyParameter } from './Core/AddAttributeToPropertyParameter.ts';
export { AddAttributeToConstructor } from './Core/AddAttributeToConstructor.ts';
export { AddAttributeToConstructorParameter } from './Core/AddAttributeToConstructorParameter.ts';

export { GetAnnotation } from './Core/GetAnnotation';
export { GetConstructorAnnotation } from './Core/GetConstructorAnnotation.ts';
export { GetPropertyAnnotation } from './Core/GetPropertyAnnotation.ts';

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
