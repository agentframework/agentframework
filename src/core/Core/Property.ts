import { Annotation } from './Annotation';

export interface Property extends Annotation {
  readonly target: object | Function;
  // readonly key: string | symbol;
  descriptor?: PropertyDescriptor;
  parameters?: ReadonlyMap<number, Annotation>;
  // readonly value?: Annotation;
  // readonly getter?: Annotation;
  // readonly setter?: Annotation;
}
