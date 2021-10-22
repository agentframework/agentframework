import { Annotation } from './Annotation';
import { Parameter } from './Parameter';

/**
 * @internal
 */
export class Property extends Annotation {
  descriptor?: PropertyDescriptor;

  parameters?: Map<number, Parameter>;

  constructor(readonly target: object | Function, descriptor?: PropertyDescriptor) {
    super();
    descriptor && (this.descriptor = descriptor);
  }
}
