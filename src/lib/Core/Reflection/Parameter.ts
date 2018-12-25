import { Type } from './Type';

/**
 * Parameter
 */
export class Parameter<P> extends Type<P> {
  protected readonly parent: P
  get type(): any {
    return this.getMetadata('design:type');
  }
}
