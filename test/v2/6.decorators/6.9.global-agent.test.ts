// import { Agent, Arguments, Invocation, Reflector, agent } from '../../../packages/dependencies/agent';
//
// describe('6.9. Global Agent', () => {
//   describe('# should able to', () => {
//
//     it('get same value', () => {
//       Reflector(Agent).static.addAttribute({
//         interceptor: {
//           intercept(target: Invocation, params: Arguments, receiver: unknown): unknown {
//             const ins: any = target.invoke(params, receiver);
//             ins['up'] = true;
//             ins['version'] = '2.0';
//             return ins;
//           },
//         },
//       });
//       Reflector(Agent).static.addAttribute({
//         interceptor: {
//           intercept(target: Invocation, params: Arguments, receiver: unknown): unknown {
//             const ins: any = target.invoke(params, receiver);
//             ins['down'] = true;
//             ins['version'] = '3.0';
//             return ins;
//           },
//         },
//       });
//
//       @agent()
//       class ClassRandom692 {}
//
//       expect(ClassRandom692['version']).toBe('3.0');
//       expect(ClassRandom692['up']).toBe(true);
//       expect(ClassRandom692['down']).toBe(true);
//     });
//   });
// });
