import { Knowledge } from '../Knowledge';
import { Property } from './Property';

export function GetOwnPropertyAnnotation(target: object | Function, key: string | symbol): Property | undefined {
  const knowledge = Knowledge.get(target);
  if (!knowledge) {
    return;
  }
  const property = Reflect.getOwnPropertyDescriptor(knowledge, key);
  if (!property) {
    return;
  }
  return property.value;
}

export function GetPropertyAnnotation(target: object | Function, key: string | symbol): Property | undefined {
  const knowledge = Knowledge.add(target);
  const property = Reflect.get(knowledge, key);
  if (!property) {
    return;
  }
  return property;
}
