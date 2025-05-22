/*********************************************************************
 *   (Stability: 2 - Stable) Annotation
 *********************************************************************/

export { Type } from './Type.ts';
export { Property } from './Property.ts';
export { Parameter } from './Parameter.ts';
export { Annotation } from './Annotation.ts';

/*********************************************************************
 *   (Stability: 2 - Stable) Annotation API
 *********************************************************************/
export { AddAttributeToProperty } from './AddAttributeToProperty.ts';
export { AddAttributeToPropertyParameter } from './AddAttributeToPropertyParameter.ts';
export { AddAttributeToConstructor } from './AddAttributeToConstructor.ts';
export { AddAttributeToConstructorParameter } from './AddAttributeToConstructorParameter.ts';

export { GetAnnotation } from './GetAnnotation.ts';
export { GetConstructorAnnotation } from './GetConstructorAnnotation.ts';
export { GetPropertyAnnotation } from './GetPropertyAnnotation.ts';

/*********************************************************************
 *    (Stability: 2 - Stable): Memory API
 *********************************************************************/
export { Remember, SetMemory, GetMemory } from './Memory.ts';

/*********************************************************************
 *    (Stability: 2 - Stable): Internal Helper Function
 *********************************************************************/
export { DefineValue } from './DefineValue.ts';
export { DefineIfValue } from './DefineIfValue.ts';
export { DefineGetter } from './DefineGetter.ts';

/*********************************************************************
 *    (Stability: 1 - Experimental): TSLIB integrate with Metadata
 *********************************************************************/
// export { __esDecorate } from './Core/__esDecorate';
// export { __runInitializers } from './Core/__runInitializers';
