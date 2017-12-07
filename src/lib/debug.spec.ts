import { agent } from './agent'
import { AgentInterceptorBuildType, decorateClass } from './core/decorator';


var Benchmark = require('benchmark');

/**
 * Define an agent
 * @returns {(target:Constructor)=>(void|Constructor)}
 */
export function id(identifier?: any) {
  return decorateClass(new IdAttribute(identifier));
}

export class IdAttribute {
  
  constructor(private _identifier?: any) {
  
  }
  
  get identifier() {
    return this._identifier;
  }
  
}

export interface IHaveName {
  name: string
}

export class Creature implements IHaveName {
  get name(): string {
    throw new Error('Unknown creature');
  }
}


@agent('People')
@id('cool')
export class People extends Creature implements IHaveName {
  name = 'Agent Framework';
  
  getName() {
    return this.name;
  }
}

//
// @agent('Manager')
// class Manager extends People implements IHaveName {
//   name = 'Mgr. Peter';
//
//   getName() {
//     return this.name;
//   }
// }
//
// // @agent2('Manager2')
// // class Manager2 extends People implements IHaveName {
// //   name = 'Mgr. Peter';
// //   getName() {
// //     return this.name;
// //   }
// // }
// // @agent3('Manager3')
// // class Manager3 extends People implements IHaveName {
// //   name = 'Mgr. Peter';
// //   getName() {
// //     return this.name;
// //   }
// // }
//
// @agent()
// class Developer extends People {
//
//   @inject(Creature)
//   project: IHaveName;
//
//   @inject('People')
//   manager: IHaveName;
//
//   @inject('Manager')
//   get supervisor(): Manager {
//     throw new Error('Supervisor not injected');
//   }
//
//   @failure('n/a')
//   supervisorName() {
//     return this.supervisor.name;
//   }
//
//   constructor() {
//     super();
//     console.log(`Create new Developer instance`);
//     console.log(`Your manager is ${this.manager.name}`);
//     console.log(`Your project is ${this.project.name}`);
//     // console.log(`Your supervisor is ${this.supervisorName()} (fail safe)`);
//     // console.log(`Your supervisor is ${this.supervisor.name}`);
//   }
//
// }

// var suite = new Benchmark.Suite;
// suite.add('POJO', function () {
//   new Project();
// }).add('AgentFramework (proxy)', function () {
//   new Manager();
// }).add('AgentFramework (class + this + Reflect)', function () {
//   new Manager2();
// }).add('AgentFramework (function)', function () {
//   new Manager3();
// }).on('cycle', function (event) {
//   console.log(String(event.target));
// }).on('complete', function () {
//   console.log('Fastest is ' + this.filter('fastest').map('name'));
// }).run();

@agent(null, AgentInterceptorBuildType.LazyFunction)
class LazyFunction {
}

@agent(null, AgentInterceptorBuildType.LazyClass)
class LazyClass {
}

@agent(null, AgentInterceptorBuildType.LazyProxy)
class LazyProxy {
}

@agent(null, AgentInterceptorBuildType.StaticFunction)
class StaticFunction {
}

@agent(null, AgentInterceptorBuildType.StaticClass)
class StaticClass {
}

@agent(null, AgentInterceptorBuildType.StaticProxy)
class StaticProxy {
}

@agent(null, AgentInterceptorBuildType.DynamicFunction)
class DynamicFunction {
}

@agent(null, AgentInterceptorBuildType.DynamicClass)
class DynamicClass {
}

@agent(null, AgentInterceptorBuildType.DynamicProxy)
class DynamicProxy {
}

var suite = new Benchmark.Suite;
suite.add('LazyFunction', function () {
  new LazyFunction();
}).add('LazyClass', function () {
  new LazyClass()
}).add('LazyProxy', function () {
  new LazyProxy()
}).add('StaticFunction', function () {
  new StaticFunction();
}).add('StaticClass', function () {
  new StaticClass()
}).add('StaticProxy', function () {
  new StaticProxy()
}).add('DynamicFunction', function () {
  new StaticFunction();
}).add('DynamicClass', function () {
  new StaticClass()
}).add('DynamicProxy', function () {
  new StaticProxy()
}).on('cycle', function (event) {
  console.log(String(event.target));
}).on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
}).run();

describe('@debug', () => {
  
  describe('# should able to access injected property in constructor', () => {
    
    
    it('new instance', () => {
      
      const people = new People();
      
      // const m1 = new Manager();
      // const p1 = Reflect.getPrototypeOf(m1);
      // // const m2 = new Manager2();
      // // const p2 = Reflect.getPrototypeOf(m2);
      // // const m3 = new Manager3();
      // // const p3 = Reflect.getPrototypeOf(m3);
      //
      // const manager = m1;
      // const proto = Reflect.getPrototypeOf(manager);
      //
      // // const proto2 = Developer.prototype;
      // expect(manager instanceof Manager).toBe(true);
      // expect(Reflect.getPrototypeOf(Manager)).toBe(Developer.prototype);
      // expect(Reflect.getPrototypeOf(Manager)).toBe(Function.prototype);
      // expect(Reflect.getPrototypeOf(Creature)).toBe(Function.prototype);
      
    });
    
    
    // it('new instance', () => {
    //   const developer = new Developer();
    //   const proto = Reflect.getPrototypeOf(developer);
    //   // const proto2 = Developer.prototype;
    //   expect(developer instanceof Developer).toBe(true);
    //   expect(Reflect.getPrototypeOf(developer)).toBe(Developer.prototype);
    //   expect(Reflect.getPrototypeOf(Developer)).toBe(Function.prototype);
    //   expect(Reflect.getPrototypeOf(Project)).toBe(Function.prototype);
    // });
    
    // it('construct instance', () => {
    //   const developer = Reflect.construct(Developer, []);
    //   expect(Reflect.getPrototypeOf(developer)).toBe(Developer.prototype);
    //   expect(developer instanceof Developer).toBe(true);
    // });
    
  });
  
});

