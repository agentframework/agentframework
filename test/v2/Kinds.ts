import { MemberKinds } from '../../lib/dependencies/agent';

export const ClassField = MemberKinds.Property; // | MemberKinds.Field;
export const ClassMethod = MemberKinds.Property; //| MemberKinds.Method;
export const ClassMethodParameter = MemberKinds.Parameter; //| MemberKinds.MethodParameter;
export const ClassConstructorParameter = MemberKinds.Parameter; //| MemberKinds.MethodParameter;
