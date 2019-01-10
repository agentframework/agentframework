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
    const a = target.invoke(parameters);
    console.log(a === undefined);
    console.log('design', typeof target.design);
    let type;
    return Reflect.construct(target.design!.type, [target.target, target.design]);
  }
}
