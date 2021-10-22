import { GetOwnPropertyAnnotation } from './GetPropertyAnnotation';
import { Parameter } from './Parameter';
import { Property } from './Property';

export function GetOwnPropertyParameterAnnotation<A extends Property = Property>(
  target: object | Function,
  key: string | symbol,
  index: number
): Parameter | undefined {
  const property = GetOwnPropertyAnnotation<A>(target, key);
  return property && property.parameters && property.parameters.get(index);
}
