import { IAttribute } from './attribute';
import { IsObjectOrFunction, IsUndefined, ToPropertyKey, IsFunction, ToPrototypeArray } from './utils';
import { getOriginConstructor } from './decorator';
import { Metadata } from './metadata';
import { Agent } from '../agent';


/**
 * Reflection
 */
export class Reflection {

  private _attributes: Array<IAttribute>;
  private _metadata: Map<string, any>;
  private _hasInjectors: boolean;

  private constructor(private _target: Object, private _targetKey?: string | symbol, private _descriptor?: PropertyDescriptor) {
    if (IsUndefined(_descriptor) && !IsUndefined(_targetKey)) {
      this._descriptor = Object.getOwnPropertyDescriptor(_target, _targetKey);
    }
    this._attributes = [];
    this._metadata = new Map<string, any>();
    this._hasInjectors = false;
    
    // MVP: Add support for ES2017 Reflect.metadata
    if (Reflect['getMetadata'] && typeof Reflect['getMetadata'] === 'function') {
      this.getMetadata = function (key: string) {
        let metadata = Reflect['getMetadata'](key, this.target, this.targetKey);
        return metadata || this._metadata.get(key);
      }
    }
    
  }

  public static getInstance(target: Object | Function, targetKey?: string | symbol): Reflection | null {
    if (!IsObjectOrFunction(target)) {
      throw new TypeError();
    }
    if (!IsUndefined(targetKey)) {
      const instance = IsFunction(target) ? target['prototype'] : target;
      targetKey = ToPropertyKey(targetKey);
      return Metadata.get(instance, targetKey);
    }
    else {
      const originTarget = getOriginConstructor(target);
      const instance = IsFunction(originTarget) ? originTarget['prototype'] : originTarget;
      return Metadata.get(instance);
    }
  }

  public static getOwnInstance(target: Object | Function, targetKey?: string | symbol): Reflection | null {
    if (!IsObjectOrFunction(target)) {
      throw new TypeError();
    }
    if (!IsUndefined(targetKey)) {
      const instance = IsFunction(target) ? target['prototype'] : target;
      targetKey = ToPropertyKey(targetKey);
      return Metadata.getOwn(instance, targetKey);
    }
    else {
      const originTarget = getOriginConstructor(target);
      const instance = IsFunction(originTarget) ? originTarget['prototype'] : originTarget;
      return Metadata.getOwn(instance);
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

  public static addAttribute(attribute: IAttribute, target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor) {
    const reflection = Reflection.getOrCreateOwnInstance(target, targetKey, descriptor);
    reflection.addAttribute(attribute);
  }

  public static addMetadata(key: string, value: any, target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor) {
    const reflection = Reflection.getOrCreateOwnInstance(target, targetKey, descriptor);
    reflection.addMetadata(key, value);
  }

  public static findReflections(typeOrInstance: Agent): Map<string, Reflection> {

    const result = new Map<string, Reflection>();

    const prototypes = ToPrototypeArray(typeOrInstance);

    prototypes.reverse().forEach(proto => {

      const reflections = Metadata.getAll(proto);

      // register all params config or middleware config
      reflections.forEach((reflection: Reflection, methodName: string) => {
        // property don't have a descriptor
        if (methodName && !reflection.descriptor) {
          // reflection without descriptor must a field
          result.set(methodName, reflection);
        }
      });

    });

    return result;
  }
  
  public static findOwnInjectors(typeOrInstance: any): Map<string, Reflection> {
    const proto = IsFunction(typeOrInstance) ? typeOrInstance.prototype : Reflect.getPrototypeOf(typeOrInstance);
    const reflections = Metadata.getAll(proto);
    const results = new Map<string, Reflection>();
    // register all params config or middleware config
    reflections.forEach((reflection: Reflection, methodName: string) => {
      // property don't have a descriptor
      if (methodName && reflection.hasInjectors()) {
        // reflection without descriptor must a field
        results.set(methodName, reflection);
      }
    });
    return results;
  }

  private static getOrCreateOwnInstance(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): Reflection {
    const instance = IsFunction(target) ? target['prototype'] : target;
    let reflection = Reflection.getOwnInstance(instance, targetKey);
    if (!reflection) {
      reflection = new Reflection(instance, targetKey, descriptor);
      Metadata.saveOwn(reflection, instance, targetKey);
    }
    return reflection;
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
  
  hasInjectors(): boolean {
    return this._hasInjectors;
  }
  
  addAttribute(attr: IAttribute): void {
    this._attributes.push(attr);
    // if the attribute provide a getInterceptor, that means this property may need inject
    if (attr.getInterceptor) {
      this._hasInjectors = true;
    }
  }

  getMetadata(key: string): any | null {
    return this._metadata.get(key);
  }

  addMetadata(key: string, value: any) {
    // console.log('added design for ', this._target, '.', this._targetKey, '->', key, '=', value);
    this._metadata.set(key, value);
  }

  get target(): Object | Function {
    return this._target;
  }

  get type(): any {
    return this.getMetadata('design:type');
  }

  get paramtypes(): Array<any> {
    return this.getMetadata('design:paramtypes');
  }

  get returntype(): any {
    return this.getMetadata('design:returntype');
  }

  get targetKey(): string | symbol {
    return this._targetKey;
  }

  get descriptor(): PropertyDescriptor | null {
    return this._descriptor;
  }

}
