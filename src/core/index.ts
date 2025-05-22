/*********************************************************************
 *   (Stability: 2 - Stable) Annotation
 *********************************************************************/
export { Type } from './Core/Meta/Type.ts';
export { Property } from './Core/Meta/Property.ts';
export { Parameter } from './Core/Meta/Parameter.ts';
export { Annotation } from './Core/Meta/Annotation.ts';

/*********************************************************************
 *   (Stability: 2 - Stable) Annotation API
 *********************************************************************/
export { AddAttributeToProperty } from './Core/Meta/AddAttributeToProperty.ts';
export { AddAttributeToPropertyParameter } from './Core/Meta/AddAttributeToPropertyParameter.ts';
export { AddAttributeToConstructor } from './Core/Meta/AddAttributeToConstructor.ts';
export { AddAttributeToConstructorParameter } from './Core/Meta/AddAttributeToConstructorParameter.ts';

export { GetAnnotation } from './Core/Meta/GetAnnotation.ts';
export { GetConstructorAnnotation } from './Core/Meta/GetConstructorAnnotation.ts';
export { GetPropertyAnnotation } from './Core/Meta/GetPropertyAnnotation.ts';

/*********************************************************************
 *    (Stability: 2 - Stable): Memory API
 *********************************************************************/
export { Remember, SetMemory, GetMemory } from './Core/Meta/Memory.ts';

/*********************************************************************
 *    (Stability: 2 - Stable): Internal Helper Function
 *********************************************************************/
export { DefineValue } from './Core/Meta/DefineValue.ts';
export { DefineIfValue } from './Core/Meta/DefineIfValue.ts';
export { DefineGetter } from './Core/Meta/DefineGetter.ts';

/*********************************************************************
 *    (Stability: 1 - Experimental): TSLIB integrate with Metadata
 *********************************************************************/
// export { __esDecorate } from './Core/__esDecorate';
// export { __runInitializers } from './Core/__runInitializers';
