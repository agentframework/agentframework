import { Annotation } from '../Annotation/Annotation';

/**
 * Add metadata
 */
export function AddMetadata(annotation: Annotation, key: string, value: object): void {
  annotation.set(key, value);
}
