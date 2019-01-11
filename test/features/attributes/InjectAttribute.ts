import { IInitializer, IInitializerAttribute, IInvocation, Parameter } from '../../../src/lib';

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
    return Reflect.construct(target.design!.type, [target.invoke(parameters), target.target, target.design]);
  }
}
