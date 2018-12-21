import { Decoratable } from './decoratable';
import { IDesign } from './design';

/**
 * Parameter
 */
export class Parameter extends Decoratable implements IDesign {
  get type(): any {
    return this.getMetadata('design:type');
  }
}
