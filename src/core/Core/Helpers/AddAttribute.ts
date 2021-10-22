import { Annotation } from '../Annotation/Annotation';

/**
 * add attribute
 */
export function AddAttribute(annotation: Annotation, attribute: object) {
  annotation.attributes.push(attribute);
}
