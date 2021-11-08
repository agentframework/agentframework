import { Property } from './Property';

export interface Type extends Property {
  readonly prototype: object;
  properties?: ReadonlyMap<string | symbol, Property>;
}
