import { Property } from './Property.ts';

export class Type extends Property {
  properties?: Map<string | symbol, Property>;
  constructor(
    readonly target: object | Function,
    readonly prototype: Record<string | symbol, any>,
  ) {
    super(target);
  }
}
