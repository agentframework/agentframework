// /* tslint:disable */
//
// import { decorateMember, agent, IsAgent, GetAgentType } from '../../../src';
// import { InjectAttribute } from '../attributes/InjectAttribute';
// import { AgentTrackerAttribute } from '../attributes/AgentTrackerAttribute';
//
// class Connection {
//   static count = 0;
//   state = 'offline';
//   constructor() {
//     Connection.count++;
//   }
// }
//
// class Database {
//   @decorateMember(new InjectAttribute())
//   connection!: Connection;
// }
//
// class MongoDB extends Database {
//   run(cmd: any) {
//     return 8.5;
//   }
// }
//
// @agent()
// class MySQL extends Database {
//   run(cmd: any) {
//     return 3.1;
//   }
// }
//
// class Redis extends Database {
//   run(cmd: any) {
//     return 1.9;
//   }
// }
//
// describe('Compiler', () => {
//   describe('# should able to', () => {
//     it('create using factory', () => {
//       const MongoDB$ = CreateAgent(MongoDB);
//       const db = new MongoDB$();
//       expect(db).toBeInstanceOf(MongoDB);
//       expect(db).toBeInstanceOf(MongoDB$);
//       expect(Reflect.getPrototypeOf(db)).toBe(MongoDB$.prototype);
//       expect(Reflect.getPrototypeOf(MongoDB$.prototype)).toBe(MongoDB.prototype);
//     });
//
//     it('create using custom factory', () => {
//       const MongoDB$ = CreateAgent(MongoDB, new AgentTrackerAttribute());
//       expect(IsAgent(MongoDB$)).toBeFalse();
//       const db = new MongoDB$();
//       expect(db).toBeInstanceOf(MongoDB);
//       expect(db).toBeInstanceOf(MongoDB$);
//     });
//
//     it('create using decorator', () => {
//       const MySQL$ = CreateAgent(MySQL);
//       expect(IsAgent(MySQL$)).toBeTrue();
//       expect(IsAgent(MySQL$, MySQL)).toBeFalse();
//       expect(IsAgent(MySQL$, GetAgentType(MySQL))).toBeTrue();
//       const db = new MySQL$();
//       expect(db).not.toBeInstanceOf(MySQL);
//       expect(db).toBeInstanceOf(MySQL$);
//     });
//
//     it('create using custom decorator', () => {
//       const Redis$ = CreateAgent(Redis, new AgentTrackerAttribute());
//       const db = new Redis$();
//       expect(db).toBeInstanceOf(Redis);
//       expect(db).toBeInstanceOf(Redis$);
//       expect(Redis$).toBe(Redis);
//     });
//   });
// });
