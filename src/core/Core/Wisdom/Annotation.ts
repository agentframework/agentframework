import { Attribute } from '../Interfaces/Attribute';

/**
 * metadata for a member. key: string, value: any
 */
export class Annotation extends Map<string, any> {
  // metadata
  readonly attributes: Array<Attribute> = [];
}

/**
 * Parameter
 */
export class Parameter extends Annotation {
  constructor(readonly index: number) {
    super();
  }
}

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
