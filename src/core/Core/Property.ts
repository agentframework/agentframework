import { Annotation } from './Annotation';
import { Parameter } from './Parameter';

/**
 * Metadata for a property.
 */
export class Property extends Annotation {

  descriptor?: PropertyDescriptor;

  parameters?: Map<number, Parameter>;

  value?: Annotation;

  getter?: Annotation;

  setter?: Annotation;

  constructor(readonly target: object | Function, readonly key: string | symbol, descriptor?: PropertyDescriptor) {
    super();
    descriptor && (this.descriptor = descriptor);
  }
}
