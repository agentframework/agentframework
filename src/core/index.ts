/*********************************************************************
 *   (Stability: 2 - Stable) Annotation
 *********************************************************************/
export { Annotation } from './Core/Annotation/Annotation';
export { Property } from './Core/Annotation/Property';

/*********************************************************************
 *   (Stability: 2 - Stable) Annotation API
 *********************************************************************/
export { AddAttributeToProperty } from './Core/Annotation/AddAttribute';
export { AddAttributeToPropertyParameter } from './Core/Annotation/AddAttribute';
export { AddAttributeToClass } from './Core/Annotation/AddAttributeToClass';
export { AddAttributeToClassConstructorParameter } from './Core/Annotation/AddAttributeToClass';

export { GetOwnKnowledge } from './Core/Annotation/GetKnowledge';
export { GetKnowledge } from './Core/Annotation/GetKnowledge';

export { GetOwnPropertyAnnotation } from './Core/Annotation/GetPropertyAnnotation';
export { GetPropertyAnnotation } from './Core/Annotation/GetPropertyAnnotation';

/*********************************************************************
 *    (Stability: 1 - Experimental): TSLIB integrate with Metadata
 *********************************************************************/
export { __decorate } from './Core/Annotation/__decorate';
export { __agent } from './Core/Annotation/__agent';
export { __metadata } from './Core/Annotation/__metadata';
export { __param } from './Core/Annotation/__param';
