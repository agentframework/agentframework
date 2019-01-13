import { Constructor } from '../Compiler/Constructor';
import { Method } from './Method';
import { Property } from './Property';
import { PropertyFilter } from './PropertyFilters';
import { Types } from '../Internal/Cache';

/**
 * Reflection information for user class
 *
 * A class is a Function. So Class extends from Method
 */
export class Type extends Method<null> {
  private readonly _prototype: object;
  private readonly _properties: Map<PropertyKey, Property>;

  constructor(prototype: Object) {
    super(null, prototype.constructor.length);
    this._prototype = prototype;
    this._properties = new Map<PropertyKey, Property>();
  }

  /**
   * Return the prototype of reflecting class
   */
  get type(): object {
    return this._prototype;
  }

  /**
   * Return the constructor of reflecting class
   */
  get target(): Constructor<any> {
    return this._prototype.constructor as Constructor<any>;
  }

  /**
   * Add the metadata
   */
  addMetadata(key: string, value: any) {
    // for class
    super.addMetadata(key, value);
    // apply class method parameter type into parameter metadata
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
   * @param {string | Symbol | number} key
   * @param {PropertyDescriptor} descriptor
   * @returns {Property}
   */
  property(key: PropertyKey, descriptor?: PropertyDescriptor): Property {
    if (!this._properties.has(key)) {
      descriptor = descriptor || Object.getOwnPropertyDescriptor(this._prototype, key);
      this._properties.set(key, new Property(this, key, descriptor));
    }
    return this._properties.get(key)!;
  }

  /**
   * Return all properties
   *
   * @returns {IterableIterator<Property>}
   */
  properties(): IterableIterator<Property> {
    return this._properties.values();
  }

  /**
   * Returns a filtered array of Property objects of this prototype.
   *
   * @param {PropertyFilter} filter
   * @param filterCriteria
   * @returns {Property[]}
   */
  findOwnProperties(filter: PropertyFilter, filterCriteria?: any): Map<PropertyKey, Property> {
    const properties = new Map<PropertyKey, Property>();
    for (const [key, property] of this._properties.entries()) {
      if (filter(property, filterCriteria)) {
        properties.set(key, property);
      }
    }
    return properties;
  }

  /**
   * Returns a filtered array of Property objects for all prototype in prototype chain.
   *
   * @param {PropertyFilter} filter
   * @param filterCriteria
   * @returns {Property[]}
   */
  findProperties(filter: PropertyFilter, filterCriteria?: any): Array<[Object, Map<PropertyKey, Property>]> {
    const prototypes = [];
    const layers: Array<[Object, Map<PropertyKey, Property>]> = [];

    let p = this._prototype;
    while (p) {
      prototypes.unshift(p);
      p = Object.getPrototypeOf(p);
    }

    for (const proto of prototypes) {
      let type: Type = Types.get(proto);
      if (!type) {
        type = new Type(proto);
        Types.set(proto, type);
      }
      const properties = new Map<PropertyKey, Property>();
      for (const [key, property] of type._properties.entries()) {
        if (filter(property, filterCriteria)) {
          properties.set(key, property);
        }
      }
      if (properties.size) {
        layers.push([type, properties]);
      }
    }

    return layers;
  }
}
