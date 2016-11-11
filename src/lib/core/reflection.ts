import { IAttribute } from './attribute';
import { IsObjectOrFunction, IsUndefined, ToPropertyKey } from './utils';
import { Metadata } from './metadata';

/**
 * Reflection
 */
export class Reflection {

  private _attributes: Array<IAttribute>;
  static metadata: Metadata = new Metadata();

  private constructor(private _target: Object, private _targetKey?: string | symbol, private _descriptor?: PropertyDescriptor) {
    if (IsUndefined(_descriptor) && !IsUndefined(_targetKey)) {
      this._descriptor = Object.getOwnPropertyDescriptor(_target, _targetKey);
    }
    this._attributes = [];
  }

  public static getInstance(target: Object | Function,
    targetKey?: string | symbol): Reflection | null {
    if (!IsObjectOrFunction(target)) {
      throw new TypeError();
    }
    if (!IsUndefined(targetKey)) {
      targetKey = ToPropertyKey(targetKey);
    }
    return Reflection.metadata.get(target, targetKey);
  }

  public static getOwnInstance(target: Object | Function, targetKey?: string | symbol): Reflection {
    if (!IsObjectOrFunction(target)) {
      throw new TypeError();
    }
    if (!IsUndefined(targetKey)) {
      targetKey = ToPropertyKey(targetKey);
    }
    return Reflection.metadata.getOwn(target, targetKey);
  }

  public static getAttributes(target: Object | Function, targetKey?: any): Array<IAttribute> {
    // const prototype = target['prototype'] || target;
    const reflection = Reflection.getInstance(target, targetKey);
    return reflection ? reflection.getAttributes() : [];
  }

  public static hasAttributes(target: Object | Function, targetKey?: any): boolean {
    // const prototype = target['prototype'] || target;
    const reflection = Reflection.getInstance(target, targetKey);
    return reflection ? reflection.hasAttributes() : false;
  }

  public static addAttribute(attribute: IAttribute,
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor) {

    const prototype = target['prototype'] || target;
    // console.log('addAttribute', target, 'key', targetKey, 'prototype', prototype);
    let reflection = Reflection.getOwnInstance(target, targetKey);
    if (!reflection) {
      reflection = new Reflection(target, targetKey, descriptor);
      Reflection.metadata.saveOwn(reflection, target, targetKey);
    }
    reflection.addAttribute(attribute);
  }

  getAttributes(): Array<IAttribute> {
    return this._attributes;
  }

  hasAttributes(): boolean {
    return this._attributes.length > 0
  }

  addAttribute(attr: IAttribute): void {
    this._attributes.push(attr);
  }

  get target(): Object | Function {
    return this._target;
  }

  get targetKey(): string | symbol {
    return this._targetKey;
  }

  get descriptor(): PropertyDescriptor | null {
    return this._descriptor;
  }

}
