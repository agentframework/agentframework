/*********************************************************************
 *   (Stability: 2 - Stable) Annotation
 *********************************************************************/
export { Type } from './Core/Metadata/Annotation/Type.ts';
export { Property } from './Core/Metadata/Annotation/Property.ts';
export { Parameter } from './Core/Metadata/Annotation/Parameter.ts';
export { Annotation } from './Core/Metadata/Annotation/Annotation.ts';

/*********************************************************************
 *   (Stability: 2 - Stable) Annotation API
 *********************************************************************/
export { AddAttributeToProperty } from './Core/Metadata/AddAttributeToProperty.ts';
export { AddAttributeToPropertyParameter } from './Core/Metadata/AddAttributeToPropertyParameter.ts';
export { AddAttributeToConstructor } from './Core/Metadata/AddAttributeToConstructor.ts';
export { AddAttributeToConstructorParameter } from './Core/Metadata/AddAttributeToConstructorParameter.ts';

export { GetAnnotation } from './Core/Metadata/GetAnnotation.ts';
export { GetConstructorAnnotation } from './Core/Metadata/GetConstructorAnnotation.ts';
export { GetPropertyAnnotation } from './Core/Metadata/GetPropertyAnnotation.ts';

/*********************************************************************
 *    (Stability: 2 - Stable): Memory API
 *********************************************************************/
export { Remember, SetMemory, GetMemory } from './Core/Metadata/Memory.ts';

/*********************************************************************
 *    (Stability: 2 - Stable): Internal Helper Function
 *********************************************************************/
export { DefineValue } from './Core/Metadata/Object/DefineValue';
export { DefineIfValue } from './Core/Metadata/Object/DefineIfValue';

/*********************************************************************
 *    (Stability: 1 - Experimental): TSLIB integrate with Metadata
 *********************************************************************/
// export { __esDecorate } from './Core/__esDecorate';
// export { __runInitializers } from './Core/__runInitializers';
