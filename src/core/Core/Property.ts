import { Annotation } from './Annotation';
import { Parameter } from './Parameter';

export interface Property extends Annotation {
  readonly target: object | Function;
  descriptor?: PropertyDescriptor;
  parameters?: ReadonlyMap<number, Parameter>;
}
