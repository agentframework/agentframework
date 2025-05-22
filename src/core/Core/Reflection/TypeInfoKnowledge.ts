import { Remember } from '../Meta';
import { TypeInfo } from './TypeInfo.ts';

export class TypeInfos {
  /**
   * get types map
   */
  static get v2() {
    return Remember('TypeInfos', this, 'v2', () => new WeakMap<Function | object, TypeInfo>());
  }
}
