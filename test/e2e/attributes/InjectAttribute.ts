import { IInitializer, IInitializerAttribute, IInvocation } from '../../../src/lib';

export class InjectAttribute implements IInitializerAttribute, IInitializer {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return true;
  }

  get initializer(): IInitializer {
    return this;
  }

  initialize(target: IInvocation, parameters: ArrayLike<any>): any {
    expect(typeof target.target).toBe('function');
    return Reflect.construct(target.design!.type, parameters);
  }
}
