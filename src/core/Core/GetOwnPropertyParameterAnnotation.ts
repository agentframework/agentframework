import { Annotation } from './Annotation';
import { GetOwnPropertyAnnotation } from './GetPropertyAnnotation';

export function GetOwnPropertyParameterAnnotation(
  target: object | Function,
  key: string | symbol,
  index: number
): Annotation | undefined {
  const property = GetOwnPropertyAnnotation(target, key);
  return property && property.parameters && property.parameters.get(index);
}
