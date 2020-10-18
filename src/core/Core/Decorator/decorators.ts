/**
 * This is universal decorator for all supported target
 */
export interface Decorators {
  (target: object | Function, targetKey?: string | symbol, descriptorOrIndex?: PropertyDescriptor | number): void;
}

export interface ClassDecorator {
  <TFunction extends Function>(target: TFunction): TFunction | void;
}

export interface PropertyDecorator {
  (target: Object, targetKey: string | symbol, descriptor?: PropertyDescriptor): void;
}

export interface ParameterDecorator {
  (target: Function | object, targetKey: string | symbol | undefined, parameterIndex: number): void;
}

// export interface MethodDecorator {
//   (target: Object, targetKey: string | symbol, descriptor: PropertyDescriptor): void;
// }
//
// export interface FieldDecorator {
//   (target: Object, targetKey: string | symbol): void;
// }
//
// export interface MethodParameterDecorator {
//   (target: object, targetKey: string | symbol, parameterIndex: number): void;
// }
//
// export interface ConstructorParameterDecorator {
//   (target: Function, targetKey: undefined, parameterIndex: number): void;
// }
