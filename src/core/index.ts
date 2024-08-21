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
export { GetMemory } from './Core/GetMemory';
export { GetAnnotation } from './Core/GetAnnotation';

/*********************************************************************
 *    (Stability: 1 - Experimental): TSLIB integrate with Metadata
 *********************************************************************/
export { __decorate } from './Core/__decorate';
export { __agent } from './Core/__agent';
export { __metadata } from './Core/__metadata';
export { __param } from './Core/__param';
