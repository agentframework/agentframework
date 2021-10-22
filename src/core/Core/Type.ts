import { Property } from './Property';

export interface Type extends Property {
  readonly prototype: object;
}
