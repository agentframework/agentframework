import { PropertyInfo } from './PropertyInfo';
import { Filter } from './Filter';

export interface TypeInfo extends PropertyInfo {
  /**
   * Access static annotation info
   */
  readonly static: TypeInfo;

  /**
   * Access prototype annotation info
   */
  readonly prototype: TypeInfo;

  /**
   * Get the type
   */
  readonly type: Function;

  /**
   * Returns property by key (create if not exist)
   */
  property(key: PropertyKey): PropertyInfo;

  /**
   * Return true if any properties annotated, not include the constructor
   */
  hasOwnProperties(): boolean;

  /**
   * Find all own properties
   */
  getOwnProperties(): Array<PropertyInfo>;

  /**
   * Find own property by key
   */
  getOwnProperty(key: PropertyKey): PropertyInfo | undefined;

  /**
   * Find property in own properties or prototype properties by key
   */
  getProperty(key: PropertyKey): PropertyInfo | undefined;

  /**
   * Find properties
   */
  findOwnProperties(filter: Filter<PropertyInfo>, filterCriteria?: any): Array<PropertyInfo>;

  /**
   * Find properties from own properties or prototype properties
   */
  findProperties(filter: Filter<PropertyInfo>, filterCriteria?: any): Map<TypeInfo, Array<PropertyInfo>>;

  /**
   * Find types from prototype chain
   */
  findTypes(filter?: Filter<TypeInfo>, filterCriteria?: any): Array<TypeInfo>;
}
