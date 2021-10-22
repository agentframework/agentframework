import { Property } from './Property';

export class Type extends Property {
  constructor(readonly target: object | Function, readonly prototype: object) {
    super(target);
  }
}
