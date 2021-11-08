import { Annotation } from '../Annotation/Annotation';

/**
 * add attribute
 */
export function AddAttribute(annotation: Annotation, attribute: object): void {
  const a = annotation.a || (annotation.a = []);
  a.push(attribute);
}
