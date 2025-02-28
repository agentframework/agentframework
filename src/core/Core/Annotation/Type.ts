import { Property } from './Property';

export class Type extends Property {
  properties?: Map<string | symbol, Property>;

  constructor(readonly target: object | Function, readonly prototype: object) {
    super(target);
  }
}
