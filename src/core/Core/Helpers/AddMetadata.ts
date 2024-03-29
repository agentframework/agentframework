import { Annotation } from '../Annotation/Annotation';

/**
 * Add metadata
 */
export function AddMetadata(annotation: Annotation, key: string, value: object): void {
  const m = annotation.m || (annotation.m = new Map<string, any>());
  m.set(key, value);
}
