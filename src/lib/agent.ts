import { decorateAgent } from './core/decorator';
import { IsNullOrUndefined } from './core/utils';
import { Reflector } from './core/reflector';
import { AgentAttribute } from './core/agent';


// ===========================================
// ES2015 or before
// ===========================================
/* istanbul ignore if  */
if (typeof Reflect !== 'object') {
  throw new Error('Agent Framework requires ES2016 support');
}

// ===========================================
// ES2016
// ===========================================
if (typeof Reflect['metadata'] !== 'function') {
  // Install Reflect.metadata for tsc only
  // tsc will add following code to the generated js file. in order to utilize these information.
  // we create and method of Reflect.metadata to inject these information to Reflection object
  //     Reflect.metadata("design:type", Function),
  //     Reflect.metadata("design:paramtypes", []),
  //     Reflect.metadata("design:returntype", String)
  Reflect['metadata'] = function (key: string, value: any) {
    return function (target: Object | Function,
      propertyKey?: string | symbol,
      descriptor?: PropertyDescriptor): void {

      if (IsNullOrUndefined(propertyKey)) {
        Reflector(target).addMetadata(key, value);
      }
      else {
        Reflector(target).property(propertyKey, descriptor).addMetadata(key, value);
      }

    }
  };
}
else {
  // ===========================================
  // ES2017 - no need any hack
  // ===========================================
}


/**
 * Define an agent
 * @returns {(target:Constructor)=>(void|Constructor)}
 */
export function agent(...args) {
  return decorateAgent(Reflect.construct(AgentAttribute, args));
}

// var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
//   var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
//   if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
//   else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
//   return c > 3 && r && Object.defineProperty(target, key, r), r;
// };
// var __metadata = (this && this.__metadata) || function (k, v) {
//   if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
// };

// @agent()
// class TestClass {
//
//   constructor(@decorateParameter() first: boolean, @decorateParameter() second: TestClass) {
//     return this;
//   }
//
//   @fakeClassMemberDecorator()
//   testMethod(@decorateParameter() first: boolean, @decorateParameter() second: TestClass): TestClass {
//     return this;
//   }
//
// }


// let TestClass = class TestClass {
//   constructor(first, second) {
//     return this;
//   }
//   testMethod(first, second) {
//     return this;
//   }
// };
//
// __decorate([
//   fake_1.fakeClassMemberDecorator(),
//   __param(0, decorator_1.decorateParameter()), __param(1, decorator_1.decorateParameter()),
//   __metadata("design:type", Function),
//   __metadata("design:paramtypes", [Boolean, TestClass]),
//   __metadata("design:returntype", TestClass)
// ], TestClass.prototype, "testMethod", null);
//
// TestClass = __decorate([
//   lib_1.agent()
//   __param(0, decorateParameter()), __param(1, decorateParameter()),
//   __metadata("design:paramtypes", [Boolean, TestClass])
// ], TestClass);
