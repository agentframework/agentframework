import { Property } from './Property.ts';

export interface Type extends Property {
  readonly prototype: object;
  properties?: ReadonlyMap<string | symbol, Property>;
}
