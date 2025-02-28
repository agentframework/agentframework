import { TypeInfo } from './Reflection/TypeInfo';
import { PropertyInfo } from './Reflection/PropertyInfo';

export interface CreateAgentConfiguration {
  version: number;
  name: string;
  type: TypeInfo;
  property: PropertyInfo;
}
