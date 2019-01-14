import { Member } from './Member';

/**
 * Parameter
 */
export class Parameter<P extends Member<any>> extends Member<P> {
  constructor(parent: P, readonly index: number) {
    super(parent);
  }

  get type(): any {
    return this.getMetadata('design:type');
  }
}
