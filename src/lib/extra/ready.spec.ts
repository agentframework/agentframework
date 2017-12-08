// import { agent } from '../agent'
// import { inject } from './inject';
// import { ready } from './ready';
// import { success } from './success';
//
// @agent()
// class ReadyUtilAgent {
//
//   constructor() {
//     // console.log('calling UtilAgent ctor');
//   }
//
//   ReadyUtilAgent() {
//
//   }
//
//   format(str: string, name: string) {
//     return str + name;
//   }
//
// }
//
// @agent()
// class TestReadyServiceAgent {
//
//   @inject(ReadyUtilAgent)
//   util: ReadyUtilAgent;
//
//   constructor() {
//     // console.log('calling TestServiceAgent ctor');
//   }
//
//   hello() {
//     return 'Hello' + this.util.format(',', 'Name');
//   }
//
//   @ready()
//   @success('_ready', true)
//   ready() {
//     // console.log('injected', !!this.util);
//   }
//
// }
//
//
// describe('@ready', () => {
//
//   describe('# should able to', () => {
//
//     it('without domain', () => {
//       const test = new TestReadyServiceAgent();
//       // console.log('test', Object.getPrototypeOf(test), test);
//       expect(test.util).toBeDefined();
//       expect(test['_ready']).toEqual(true);
//     });
//
//   });
//
// });
