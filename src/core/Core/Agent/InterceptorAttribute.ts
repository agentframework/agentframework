import { ClassInvocation } from '../Interfaces/TypeInvocations';
import { Arguments } from '../Interfaces/Arguments';
import { FindExtendedClass } from '../Helpers/FindExtendedClass';
import { OnDemandClassCompiler } from '../Compiler/OnDemandClassCompiler';

export class InterceptorAttribute {
  get interceptor() {
    return this;
  }

  intercept(target: ClassInvocation, params: Arguments, receiver: any) {
    const oldTarget = target.design.declaringType;
    const newTarget: Function = target.invoke(params, receiver);

    /* istanbul ignore next */
    if (oldTarget === newTarget) {
      // not allow modify user class prototype
      return newTarget;
    }

    // console.log('InterceptorAttribute', oldTarget, newTarget);

    // upgrade properties
    // const design = OnDemandTypeInfo.find(oldTarget);
    // const result1 = OnDemandTypeInfo.find(oldTarget).findProperties((p) => p.hasInterceptor());
    //
    // console.log('oldTarget 2', result1);
    const result = target.design.findProperties((p) => p.hasOwnInterceptor());

    const properties = [];

    // NOTE: Static Constructor support, deep first
    // for (const ctor of FindStaticConstructors(target.prototype)) {
    //   console.log('ctor', ctor, ctor.name);
    //   // mark before call to make sure the constructor never call again
    //   Core.MarkStaticConstructor(ctor);
    //
    //   // skip system type
    //   if (Core.IsSystemType(ctor)) {
    //     break;
    //   }
    //
    //   // check if have static constructor
    //   const descriptor = Reflect.getOwnPropertyDescriptor(ctor, ctor.name);
    //   if (descriptor && typeof descriptor.value == 'function') {
    //     Reflect.apply(descriptor.value, ctor, []);
    //   }
    // }

    for (const array of result.values()) {
      properties.push(...array);
    }

    // if (!properties.length) {
    //   return newTarget;
    // }

    // don't generate property interceptor if no extended class

    // 1. find all possible fields from design
    // todo: call make dynamic constructor
    // console.log('=========================== A     ===========================');
    // console.log('===========================  G    ===========================');
    // console.log('===========================   E   ===========================');
    // console.log('===========================    N  ===========================');
    // console.log('===========================     T ===========================');
    // console.log('proxies', proxies);

    // result is map<key,array>
    // console.log('found', this.design.name, result, properties);

    // 2. find the proxy class
    const proxies = FindExtendedClass(oldTarget, newTarget);

    // console.log('static proxies', proxies);

    // quick check, ignore if keys are been declared
    // ownKeys() >= 1 because constructor is one key always have
    OnDemandClassCompiler.upgrade(proxies[0], properties, proxies[0], proxies[1]);

    return newTarget;
  }
}
