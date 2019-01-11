// import { InterceptorFactory } from '../InterceptorFactory';
// import { Arguments } from '../../Core/Arguments';
// import { IInvocation } from '../../Core/IInvocation';
// import { Constructor } from '../../Core/Constructor';
// import { Parameters } from '../Internal/Cache';
// import { IInitializer } from '../../Core/IInitializer';
//
// export class DynamicClassInitializer implements IInitializer {
//   readonly target: any = function(args: ArrayLike<any>): ArrayLike<any> {
//     return Parameters.has(args) ? Parameters.get(args) : args;
//   };
//
//   constructor() {
//     this.target.construct = function construct<T>(
//       newTarget: Constructor<T>,
//       params: Arguments,
//       args: ArrayLike<any>
//     ): T {
//       // find target from new target
//       const target = Object.getPrototypeOf(newTarget.prototype).constructor;
//       // create a interceptor chain from the found attributes
//       return InterceptorFactory.createConstructor(target, newTarget, params, args).invoke(args);
//     };
//   }
//
//   public initialize(target: IInvocation, parameters: ArrayLike<any>): any {
//     return target.invoke([this.target, target.target.name]);
//   }
// }
