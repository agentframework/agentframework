import { Annotation } from '../Annotation/Annotation';

/**
 * add attribute
 */
export function AddAttribute(annotation: Annotation, attribute: object): void {
  annotation.attributes.push(attribute);
}
