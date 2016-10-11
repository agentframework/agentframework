import { IAttribute } from './attribute';
import { IsObject, IsUndefined, ToPropertyKey } from './utils';
import { Metadata } from './metadata';

/**
 * Reflection
 */
export class Reflection {
  
  private static metadata: Metadata = new Metadata();
  private _attributes: Array<IAttribute>;
  
  constructor(private _target: Object, private _targetKey?: string | symbol, private _descriptor?: PropertyDescriptor) {
    if (IsUndefined(_descriptor) && !IsUndefined(_targetKey)) {
      this._descriptor = Object.getOwnPropertyDescriptor(_target, _targetKey);
    }
    this._attributes = [];
  }
  
  /**
   * Get Reflection object
   * @param target
   * @param targetKey
   * @returns {Reflection}
   */
  public static getInstance(target: Object | Function,
                            targetKey?: string | symbol): Reflection {
    if (!IsObject(target)) {
      throw new TypeError();
    }
    if (!IsUndefined(targetKey)) {
      targetKey = ToPropertyKey(targetKey);
    }
    let reflection = Reflection.metadata.get(target, targetKey);
    if (!reflection) {
      reflection = new Reflection(target, targetKey);
      Reflection.metadata.saveOwn(reflection, target, targetKey);
    }
    return reflection;
  }
  
  /**
   * Get Reflection object from itself or parent
   * @param target
   * @param targetKey
   * @param descriptor
   * @returns {Reflection}
   */
  public static getOwnInstance(target: Object | Function,
                               targetKey?: string | symbol,
                               descriptor?: PropertyDescriptor): Reflection {
    if (!IsObject(target)) {
      throw new TypeError();
    }
    if (!IsUndefined(targetKey)) {
      targetKey = ToPropertyKey(targetKey);
    }
    let reflection = Reflection.metadata.getOwn(target, targetKey);
    if (!reflection) {
      reflection = new Reflection(target, targetKey, descriptor);
      Reflection.metadata.saveOwn(reflection, target, targetKey);
    }
    return reflection;
  }
  
  public static getAttributes(target: Object | Function, targetKey?: any): Array<IAttribute> {
    
    return Reflection.getInstance(target, targetKey).getAttributes();
  }
  
  public static hasAttributes(target: Object | Function, targetKey?: any): boolean {
    return Reflection.getInstance(target, targetKey).hasAttributes();
  }
  
  public static addAttribute(attribute: IAttribute,
                             target: Object | Function,
                             targetKey?: string | symbol, descriptor?: PropertyDescriptor) {
    
    Reflection.getOwnInstance(target, targetKey).addAttribute(attribute);
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
