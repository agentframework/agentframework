/**
 * tslib.__decorate class implementation
 */
export function __agent(decorators: Function[], target: object | Function): any {
  for (let i = decorators.length - 1; i >= 0; i--) {
    target = decorators[i](target) || target;
  }
  return target;
}

/**
 * tslib.__decorate implementation
 */
export function __decorate(
  decorators: Function[],
  target: object | Function,
  targetKey: string | symbol,
  desc: PropertyDescriptor | undefined | null /* field=undefined. method,getter,setter = null*/
): any {
  if (desc === null) {
    desc = Reflect.getOwnPropertyDescriptor(target, targetKey);
  }
  let modified = desc;
  for (let i = decorators.length - 1; i >= 0; i--) {
    modified = decorators[i](target, targetKey, modified || desc);
  }
  if (modified) {
    Reflect.defineProperty(target, targetKey, modified);
  }
}

/**
 * tslib.__param implementation
 */
export function __param(paramIndex: number, decorator: Function): Function {
  return function (target: Function | object, targetKey: string | symbol) {
    decorator(target, targetKey, paramIndex);
  };
}
