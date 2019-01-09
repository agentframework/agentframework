export interface Constructor<T extends Object = Object> {
  new(...args: Array<any>): T;
}
