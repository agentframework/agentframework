// /* tslint:disable */
// import { Reflector } from './Reflector';
// import { AgentAttribute } from './Agent/AgentAttribute';
// import { agent, Agent } from './agent';
// import { IsAgent } from './IsAgent';
//
// @agent()
// class MongoDB {
//   public connect(): boolean {
//     return true;
//   }
// }
//
// describe('@agent spec', () => {
//   describe('# should able to', () => {
//     it('detect agent', () => {
//       expect(IsAgent(MongoDB)).toBe(true);
//     });
//
//     it('re-upgrade agent', () => {
//       const newAgent = Agent(MongoDB);
//       expect(newAgent).not.toBe(MongoDB);
//     });
//
//     it('new instance', () => {
//       const db = new MongoDB();
//       expect(db instanceof MongoDB).toBe(true);
//     });
//
//     it('construct instance', () => {
//       const db = Reflect.construct(MongoDB, []);
//       expect(Reflect.getPrototypeOf(db)).toBe(MongoDB.prototype);
//       expect(db instanceof MongoDB).toBe(true);
//     });
//   });
//
//   describe('# should not able to', () => {
//     it('get agent attribute', () => {
//       // AgentAttribute is only used in compile agent phase
//       // AgentAttribute is not a metadata for agent class
//       const items = Reflector(MongoDB).getOwnAttributes(AgentAttribute);
//       expect(items.length).toBe(0);
//     });
//   });
// });
