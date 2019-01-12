import { Member } from './Member';

/**
 * Parameter
 */
export class Parameter<P> extends Member<P> {
  protected readonly parent: P;
  get type(): any {
    return this.getMetadata('design:type');
  }
}
