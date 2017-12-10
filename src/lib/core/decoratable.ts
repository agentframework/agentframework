import { IAttribute } from './attribute';


export abstract class Decoratable {
  
  private _attributes: Array<IAttribute> = [];
  private _metadata: Map<string, any>;
  private _hasInterceptor: boolean;
  private _hasInitializer: boolean;
  
  addAttribute(attribute: IAttribute): void {
    if (!attribute) {
      throw new TypeError(`Unable to add null attribute`);
    }
    this._attributes.push(attribute);
    // if the attribute provide a getInterceptor, that means this property may need inject
    // we don't call getInterceptor or getInitializer before user new the agent class.
    if (!!attribute.getInterceptor) {
      this._hasInterceptor = true;
    }
    if (!!attribute.getInitializer) {
      this._hasInitializer = true;
    }
  }
  
  getAttributes<T extends IAttribute>(type?): T[] {
    if (type) {
      return <Array<T>>this._attributes.filter(a => a instanceof type);
    }
    else {
      return <Array<T>>this._attributes.slice(0);
    }
  }
  
  hasInterceptors(): boolean {
    return this._hasInterceptor;
  }
  
  hasInitializer(): boolean {
    return this._hasInitializer;
  }
  
  getInterceptors(): IAttribute[] {
    return this._attributes.filter(a => a.getInterceptor);
  }
  
  getInitializers(): IAttribute[] {
    return this._attributes.filter(a => a.getInitializer);
  }
  
  getMetadata(key: string): any | null {
    if (!this._metadata) {
      return null;
    }
    return this._metadata.get(key);
  }
  
  addMetadata(key: string, value: any) {
    if (!this._metadata) {
      this._metadata = new Map<string, any>();
    }
    this._metadata.set(key, value);
  }
  
}
