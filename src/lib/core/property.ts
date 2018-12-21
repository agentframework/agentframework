import { Decoratable } from './decoratable';
import { IDesign } from './design';
import { Method } from './method';
import { IsFunction } from './utils';
import { AgentFeatures } from './compilerOptions';

/**
 * Property
 */
export class Property extends Decoratable implements IDesign {
  private readonly _methods: Map<string, Method>;

  constructor(private _key: string | symbol, private _descriptor?: PropertyDescriptor) {
    super();
    this._methods = new Map<string, Method>();
    this._methods.set('set', new Method(1));
    this._methods.set('get', new Method(0));

    let maxFunctionParameters = 0; // field don't have parameter
    if (_descriptor && _descriptor.value && IsFunction(_descriptor.value)) {
      maxFunctionParameters = _descriptor.value.length;
    }
    this._methods.set('value', new Method(maxFunctionParameters));
  }

  value(): Method {
    return this._methods.get('value');
  }

  setter(): Method {
    return this._methods.get('set');
  }

  getter(): Method {
    return this._methods.get('get');
  }

  hasFeatures(features: AgentFeatures) {
    let results;
    if ((features & AgentFeatures.Initializer) === AgentFeatures.Initializer) {
      results = this.hasInitializer() || this.setter().hasInitializer() || this.value().hasInitializer();
    }
    if ((features & AgentFeatures.Interceptor) === AgentFeatures.Interceptor) {
      results = results || this.hasInterceptors() || this.getter().hasInterceptors() || this.value().hasInterceptors();
    }
    return results;
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
    return this._key;
  }

  get descriptor(): PropertyDescriptor | null {
    return this._descriptor;
  }

  /**
   * Add the metadata generated by tsc
   * @param {string} key
   * @param value
   */
  addMetadata(key: string, value: any) {
    super.addMetadata(key, value);

    // apply method parameter type into parameter metadata
    if (this._descriptor) {
      if (this._descriptor.value) {
        // this is a method
        if (key === 'design:paramtypes' && value && value.length) {
          this.value().addMetadata('design:paramtypes', value);
          const types = value as Array<any>;
          for (let idx = types.length - 1; idx >= 0; idx--) {
            this.value()
              .parameter(idx)
              .addMetadata('design:type', types[idx]);
          }
        } else if (key === 'design:returntype') {
          this.value().addMetadata('design:returntype', value);
        }
      }

      if (this._descriptor.get) {
        if (key === 'design:type') {
          this.getter().addMetadata('design:returntype', value);
        }
      }

      if (this._descriptor.set) {
        if (key === 'design:paramtypes' && value && value.length) {
          this.setter().addMetadata('design:paramtypes', value);
          const types = value as Array<any>;
          for (let idx = types.length - 1; idx >= 0; idx--) {
            this.setter()
              .parameter(idx)
              .addMetadata('design:type', types[idx]);
          }
        }
      }
    } else {
      // this is field
      if (key === 'design:type' && value) {
        const types = value as Array<any>;
        this.value().addMetadata('design:returntype', types[0]);
      }
    }
  }
}

/**
 * Represents a callback function that is used to filter a list of behavior represented in a map of Behavior objects.
 */
export interface PropertyFilter {
  /**
   * @param {Property} value The Behavior object to which the filter is applied.
   * @param filterCriteria An arbitrary object used to filter the list.
   * @returns {boolean} `true` to include the behavior in the filtered list; otherwise false.
   */
  (value: Property, filterCriteria?: any): boolean;
}
