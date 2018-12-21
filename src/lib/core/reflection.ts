import { IDesign } from './design';
import { Method } from './method';
import { Property, PropertyFilter } from './property';

/**
 * Reflection information for user class
 *
 * A Class is a Function. So Reflection extends from Method
 */
export class Reflection<T> extends Method implements IDesign {
  private readonly _prototype: object;
  private readonly _properties: Map<string | symbol, Property>;

  constructor(prototype: object) {
    super(prototype.constructor.length);
    this._prototype = prototype;
    this._properties = new Map<string | symbol, Property>();
  }

  /**
   * Return the prototype of reflecting class
   * @returns {Object | Function}
   */
  get type(): object {
    return this._prototype;
  }

  /**
   * Return the constructor of reflecting class
   * @returns {Function}
   */
  get target(): Function {
    return this._prototype.constructor;
  }

  /**
   * Add the metadata
   * @param {string} key
   * @param value
   */
  addMetadata(key: string, value: any) {
    super.addMetadata(key, value);
    // apply method parameter type into parameter metadata
    if (key === 'design:paramtypes' && value && value.length) {
      const types = value as Array<any>;
      for (let idx = types.length - 1; idx >= 0; idx--) {
        this.parameter(idx).addMetadata('design:type', types[idx]);
      }
    }
  }

  /**
   * Return property info for specified property key
   *
   * @param {string | Symbol} key
   * @param {PropertyDescriptor} descriptor
   * @returns {Property}
   */
  property(key: string | symbol, descriptor?: PropertyDescriptor): Property {
    if (!this._properties.has(key)) {
      descriptor = descriptor || Object.getOwnPropertyDescriptor(this.type, key);
      this._properties.set(key, new Property(key, descriptor));
    }
    return this._properties.get(key);
  }

  /**
   * Returns a filtered array of Property objects.
   *
   * @param {PropertyFilter} filter
   * @param filterCriteria
   * @returns {Property[]}
   */
  findProperties(filter: PropertyFilter, filterCriteria?: any): Property[] {
    const properties: Array<Property> = [];
    for (const pair of this._properties.entries()) {
      if (filter(pair[1], filterCriteria)) {
        properties.push(pair[1]);
      }
    }
    return properties;
  }

  /**
   * Return all properties
   *
   * @returns {IterableIterator<Property>}
   */
  getProperties(): IterableIterator<Property> {
    return this._properties.values();
  }
}
