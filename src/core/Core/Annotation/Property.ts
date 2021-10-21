import { Annotation } from './Annotation';

/**
 * @internal
 */
export class Property extends Annotation {
  descriptor?: PropertyDescriptor;
  parameters?: Map<number, Annotation>;
  value?: Annotation;
  getter?: Annotation;
  setter?: Annotation;

  constructor(readonly target: object | Function, readonly key: string | symbol, descriptor?: PropertyDescriptor) {
    super();
    descriptor && (this.descriptor = descriptor);
  }
}
