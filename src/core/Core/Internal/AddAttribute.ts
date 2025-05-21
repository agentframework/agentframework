import { Annotation } from './Annotation.ts';

/**
 * add attribute
 */
export function AddAttribute(annotation: Annotation, attribute: object): void {
  const a = annotation.a || (annotation.a = []);
  a.push(attribute);
}
