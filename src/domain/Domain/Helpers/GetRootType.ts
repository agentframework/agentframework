export function GetRootType(type: any): Function {
  let root: any = type;
  let base: any = type;
  while (base && base !== Function.prototype) {
    root = base;
    base = Reflect.getPrototypeOf(base);
  }
  return root;
}
