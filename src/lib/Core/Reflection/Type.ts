import { Method } from './Method';
import { Property } from './Property';
import { PropertyFilter } from './PropertyFilters';
import { GetTypes } from '../Cache';
import { TypedConstructor } from '../TypedConstructor';

/**
 * Reflection information for user class
 *
 * A class is a Function. So Class extends from Method
 */
export class Type extends Method<Type> {
  protected readonly parent: null;
  private readonly _prototype: object;
  private readonly _properties: Map<PropertyKey, Property<Type>>;

  constructor(prototype: Object) {
    super(null, prototype.constructor.length);
    this._prototype = prototype;
    this._properties = new Map<PropertyKey, Property<Type>>();
  }

  static FromType(prototype: Object): Type {
    let found = Type.Types.get(prototype);
    if (!found) {
      found = new Type(prototype);
      Type.Types.set(prototype, found);
    }
    return found;
  }

  private static get Types(): WeakMap<Object, Type> {
    const value = GetTypes();
    Reflect.defineProperty(Type, 'Types', { value });
    return value;
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
  get target(): TypedConstructor<any> {
    return <TypedConstructor<any>>this._prototype.constructor;
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
  property(key: PropertyKey, descriptor?: PropertyDescriptor): Property<Type> {
    if (!this._properties.has(key)) {
      descriptor = descriptor || Object.getOwnPropertyDescriptor(this._prototype, key);
      this._properties.set(key, new Property<Type>(this, key, descriptor));
    }
    return this._properties.get(key)!;
  }

  /**
   * Return all properties
   *
   * @returns {IterableIterator<Property>}
   */
  properties(): IterableIterator<Property<Type>> {
    return this._properties.values();
  }

  /**
   * Returns a filtered array of Property objects of this prototype.
   *
   * @param {PropertyFilter} filter
   * @param filterCriteria
   * @returns {Property[]}
   */
  findOwnProperties(filter: PropertyFilter, filterCriteria?: any): Map<PropertyKey, Property<Type>> {
    const properties = new Map<PropertyKey, Property<Type>>();
    for (const [key, property] of this._properties.entries()) {
      if (filter(property, filterCriteria)) {
        properties.set(key, property);
      }
    }
    return properties;
  }

  /**
   * Returns a filtered array of Property objects.
   *
   * @param {PropertyFilter} filter
   * @param filterCriteria
   * @returns {Property[]}
   */
  findProperties(filter: PropertyFilter, filterCriteria?: any): Array<Map<PropertyKey, Property<Type>>> {
    const types = [];
    const layers: Array<Map<PropertyKey, Property<Type>>> = [];

    let p = this._prototype;
    while (p) {
      types.unshift(p);
      p = Object.getPrototypeOf(p);
    }

    for (const t of types) {
      const p = Type.FromType(t);
      const properties = new Map<PropertyKey, Property<Type>>();
      layers.push(properties);
      for (const [key, property] of p._properties.entries()) {
        if (filter(property, filterCriteria)) {
          properties.set(key, property);
        }
      }
    }

    return layers;
  }
}
