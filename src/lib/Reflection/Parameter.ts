import { Member } from './Member';

/**
 * Parameter
 */
export class Parameter<P> extends Member<P> {
  get type(): any {
    return this.getMetadata('design:type');
  }
}
