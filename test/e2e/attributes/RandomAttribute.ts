import 'jasmine';
import { IInitializer, IInitializerAttribute, IInvocation } from '../../../src/lib';

export class RandomAttribute implements IInitializerAttribute, IInitializer {
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
    const a = target.invoke(parameters);
    console.log(a === undefined);
    return Date.now() + 0.23133;
  }
}
