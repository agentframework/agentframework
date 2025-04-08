// import { __param } from '../../../packages/dependencies/core';
//
// class ClassA {}
//
// class ClassAB {}
//
// describe('7.2. __agent helper', () => {
//   describe('# should return type', () => {
//     // it('create from domain', () => {
//     //   const domain = new InMemoryDomain();
//     //   const ab = Construct(domain, ClassAB);
//     //   expect(ab).toBeTruthy();
//     //   expect(GetDomain(ab)).toBeTruthy();
//     //   expect(GetDomain(ab)).toBe(domain);
//     // });
//
//     it('create from domain agent', () => {
//       const result = __agent(
//         [
//           function (type: Function) {
//             return ClassAB;
//           },
//         ],
//         ClassA
//       );
//       expect(result).toBe(ClassAB);
//     });
//
//     it('create from domain agent', () => {
//       const result = __agent(
//         [
//           function (type: Function) {
//           },
//         ],
//         ClassA
//       );
//       expect(result).toBe(ClassA);
//     });
//   });
// });
