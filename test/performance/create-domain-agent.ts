// /* tslint:disable */
// import { InMemoryDomain, initializable, Initializer, inject } from 'agentframework';
// import { Arguments, ClassInvocation } from 'agentframework';
//
// export class RocketFuel {
//   constructor(readonly main: string) {}
// }
//
// export class MixedRocketFuel extends RocketFuel {
//   constructor(main: string, readonly catalyzer: string) {
//     super(main);
//   }
// }
//
// @initializable()
// export class Rocket {
//   tags: string[] = [];
//
//   @inject()
//   fuel?: RocketFuel;
//
//   [Initializer]() {
//     this.tags.push('rocket');
//   }
// }
//
// export class HeavyRocket extends Rocket {
//   static [Initializer](target: ClassInvocation, params: Arguments, receiver: Function) {
//     return target.invoke(params, receiver);
//   }
//   [Initializer]() {
//     this.tags.push('heavy');
//   }
// }
//
// export class Falcon extends HeavyRocket {
//   [Initializer]() {
//     this.tags.push('falcon');
//   }
// }
//
// export class Cargo {
//   tags: string[] = [];
//
//   @inject()
//   fuel?: RocketFuel;
//
//   constructor() {
//     this.tags.push('cargo');
//   }
// }
//
// export class PassengerCargo extends Cargo {
//   constructor() {
//     super();
//     this.tags.push('passenger');
//   }
// }
//
// export class Dragon extends PassengerCargo {
//   constructor() {
//     super();
//     this.tags.push('dragon');
//   }
// }
//
// /**
//  * Use Domain Agent Proxy to initialize object
//  *
//  * New domain and class constructor.................. x 29,163 ops/sec ±9.24% (57 runs sampled)
//  * New domain and agent initializer.................. x 23,920 ops/sec ±21.55% (48 runs sampled)
//  * Same domain with agent initializer................ x 152,901 ops/sec ±71.99% (44 runs sampled)
//  * Same domain with class constructor................ x 250,500 ops/sec ±3.12% (67 runs sampled)
//  *
//  * User @decorator on Agent Proxy to initialize object
//  *
//  * New domain and class constructor.................. x 35,444 ops/sec ±11.62% (57 runs sampled)
//  * New domain and agent initializer.................. x 30,768 ops/sec ±14.52% (50 runs sampled)
//  * Same domain with agent initializer................ x 465,103 ops/sec ±2.87% (75 runs sampled)
//  * Same domain with class constructor................ x 430,821 ops/sec ±18.43% (55 runs sampled)
//  *
//  *
//  * Use Domain Agent Proxy to initialize object
//  *
//  * New domain and class constructor.................. x 51,024 ops/sec ±7.77% (76 runs sampled)
//  * New domain and agent initializer.................. x 40,885 ops/sec ±33.72% (73 runs sampled)
//  * Same domain with agent initializer................ x 243,659 ops/sec ±62.29% (57 runs sampled)
//  * Same domain with class constructor................ x 285,722 ops/sec ±16.30% (62 runs sampled)
//  *
//  * User @decorator on Agent Proxy to initialize object
//  *
//  * New domain and class constructor.................. x 62,135 ops/sec ±7.71% (72 runs sampled)
//  * New domain and agent initializer.................. x 48,652 ops/sec ±17.39% (63 runs sampled)
//  * Same domain with agent initializer................ x 473,258 ops/sec ±63.37% (55 runs sampled)
//  * Same domain with class constructor................ x 667,158 ops/sec ±59.87% (51 runs sampled)
//  *
//  */
//
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
//
// describe('Create DomainAgent With Initializer', () => {
//   describe('# should able to', () => {
//     it('create domain agent', async () => {
//       const domain = new InMemoryDomain();
//       const fuel = domain.construct(MixedRocketFuel, ['LOX', 'RP-1']);
//
//       const fc = domain.construct(Falcon);
//       expect(fc instanceof Falcon).toBe(true);
//       expect(fc.fuel).toBe(fuel);
//       expect(fc.tags).toEqual(['rocket', 'heavy', 'falcon']);
//
//       const dg = domain.construct(Dragon);
//       expect(dg instanceof Dragon).toBe(true);
//       expect(dg.fuel).toBe(fuel);
//       expect(dg.tags).toEqual(['cargo', 'passenger', 'dragon']);
//     });
//
//     it('create lots of domain agent', async (done) => {
//       const domain = new InMemoryDomain();
//       domain.construct(MixedRocketFuel, ['LOX', 'RP-1']);
//
//       function padEnd(text: string, len: number, placeholder: string): string {
//         const need = len - text.length;
//         return text + placeholder.repeat(need);
//       }
//       const Suite = require('benchmark').Suite;
//       new Suite('domain', {
//         maxTime: 30,
//       })
//         .add(padEnd('New domain and class constructor', 50, '.'), () => {
//           const local = new InMemoryDomain();
//           return local.construct(Dragon);
//         })
//         .add(padEnd('New domain and agent initializer', 50, '.'), () => {
//           const local = new InMemoryDomain();
//           return local.construct(Falcon);
//         })
//         .add(padEnd('Same domain with agent initializer', 50, '.'), () => {
//           return domain.construct(Falcon, [], true);
//         })
//         .add(padEnd('Same domain with class constructor', 50, '.'), () => {
//           return domain.construct(Dragon, [], true);
//         })
//         .on('cycle', function (event: any) {
//           // console.log(String(event.target));
//         })
//         .on('complete', function () {
//           done();
//         })
//         .run();
//     });
//   });
// });
