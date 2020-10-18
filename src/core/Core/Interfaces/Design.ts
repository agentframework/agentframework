import { MemberKinds } from './MemberKinds';
import { AbstractConstructor } from '../Constructor';

export interface Design {
  /**
   * Reflection type
   */
  readonly kind: MemberKinds;

  /**
   * Type declaring this member
   */
  readonly declaringType: AbstractConstructor<any>;

  /**
   * Property key as a string
   */
  readonly name: string;

  /**
   * Property key
   */
  readonly key: string | symbol;

  /**
   * Property type, void = undefined, any = Object
   */
  readonly type: AbstractConstructor<any> | undefined;
}
