import { Annotation } from '../Annotation/Annotation';

export function AddMetadata(annotation: Annotation, key: string, value: object): void {
  annotation.set(key, value);
}
