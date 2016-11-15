import { IAttribute } from './attribute';
import { IsObjectOrFunction, IsUndefined, ToPropertyKey, IsFunction } from './utils';
import { Metadata } from './metadata';
import { getDecoratingClass } from './decorator';

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

  public static getInstance(target: Object | Function, targetKey?: string | symbol): Reflection | null {
    if (!IsObjectOrFunction(target)) {
      throw new TypeError();
    }
    if (!IsUndefined(targetKey)) {
      const instance = IsFunction(target) ? target['prototype'] : target;
      targetKey = ToPropertyKey(targetKey);
      return Reflection.metadata.get(instance, targetKey);
    }
    else {
      const originTarget = getDecoratingClass(target);
      const instance = IsFunction(originTarget) ? originTarget['prototype'] : originTarget;
      return Reflection.metadata.get(instance);
    }
  }

  public static getOwnInstance(target: Object | Function, targetKey?: string | symbol): Reflection {
    if (!IsObjectOrFunction(target)) {
      throw new TypeError();
    }
    if (!IsUndefined(targetKey)) {
      const instance = IsFunction(target) ? target['prototype'] : target;
      targetKey = ToPropertyKey(targetKey);
      return Reflection.metadata.getOwn(instance, targetKey);
    }
    else {
      const originTarget = getDecoratingClass(target);
      const instance = IsFunction(originTarget) ? originTarget['prototype'] : originTarget;
      return Reflection.metadata.getOwn(instance);
    }
  }

  public static getAttributes(target: Object | Function, targetKey?: any): Array<IAttribute> {
    const reflection = Reflection.getInstance(target, targetKey);
    return reflection ? reflection.getAttributes() : [];
  }

  public static hasAttributes(target: Object | Function, targetKey?: any): boolean {
    const reflection = Reflection.getInstance(target, targetKey);
    return reflection ? reflection.hasAttributes() : false;
  }

  public static addAttribute(attribute: IAttribute,
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor) {

    const instance = IsFunction(target) ? target['prototype'] : target;

    // if (!targetKey) {
    //   console.log('target', typeof target, target, Object.getPrototypeOf(instance));
    // }

    // console.log('addAttribute', target, 'key', targetKey, 'prototype', prototype);
    let reflection = Reflection.getOwnInstance(instance, targetKey);
    if (!reflection) {
      reflection = new Reflection(instance, targetKey, descriptor);
      Reflection.metadata.saveOwn(reflection, instance, targetKey);
    }
    reflection.addAttribute(attribute);
  }

  getAttributes<A extends IAttribute>(type?): Array<A> {
    if (type) {
      return this._attributes.filter(a => a instanceof type) as Array<A>;
    }
    else {
      return this._attributes.slice(0) as Array<A>;
    }
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
