import { Reflection } from './Reflection';

/**
 * Parameter
 */
export class Parameter<P> extends Reflection<P> {
  protected readonly parent: P;
  get type(): any {
    return this.getMetadata('design:type');
  }
}
