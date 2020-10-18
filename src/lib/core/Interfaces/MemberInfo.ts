import { AbstractConstructor } from '../Constructor';
import { Attribute } from './Attribute';
import { Filter } from './Filter';
import { Design } from './Design';

export interface MemberInfo extends Design {
  /**
   * Add a attribute
   */
  addAttribute<A4 extends Attribute>(attribute: A4): void;

  /**
   * Returns true if any attribute decorated
   */
  hasOwnAttribute<A1 extends Attribute>(type?: AbstractConstructor<A1>): boolean;

  /**
   * Returns a decorated attribute
   */
  getOwnAttribute<A2 extends Attribute>(type: AbstractConstructor<A2>): A2 | undefined;

  /**
   * Returns all decorated attributes
   */
  getOwnAttributes<A3 extends Attribute>(type?: AbstractConstructor<A3>): Array<A3>;

  /**
   * Find attribute using filter function and filter criteria
   */
  findOwnAttributes<A5 extends Attribute>(filter: Filter<Attribute>, filterCriteria?: any): Array<A5>;

  /**
   * Return true if decorated any interceptor
   */
  hasOwnInterceptor(): boolean;
}
