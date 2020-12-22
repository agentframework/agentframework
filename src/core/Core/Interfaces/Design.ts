import { AbstractConstructor } from '../Constructor';

export interface Design {
  /**
   * Annotation type
   */
  readonly kind: number;

  /**
   * Annotation name
   */
  readonly name: string;

  /**
   * Type declaring this member
   */
  readonly declaringType: AbstractConstructor<any>;

  /**
   * Property key for this annotation
   */
  readonly key: string | symbol;

  /**
   * Property type for this annotation, void = undefined, any = Object
   */
  readonly type: AbstractConstructor<any> | undefined;
}
