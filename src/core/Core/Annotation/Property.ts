import { Annotation } from './Annotation.ts';
import { Parameter } from './Parameter.ts';

export interface Property extends Annotation {
  readonly target: object | Function;
  descriptor?: PropertyDescriptor;
  parameters?: ReadonlyMap<number, Parameter>;
}
