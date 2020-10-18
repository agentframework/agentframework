import { MemberInfo } from './MemberInfo';

export interface ParameterInfo extends MemberInfo {
  readonly index: number;
}
