import { agent } from '../src/lib/agent'
import { AgentCompileType } from '../src/lib/core/compilerOptions';
import { inject } from '../src/lib/extra/inject';
import { failure } from '../src/lib/extra/failure';
import { normalize } from '../src/lib/extra/normalize';


export class Project {
  name = 'Agent Framework';
}

export class Employee {

  @inject(Project)
  @normalize()
  project: Project;

  name: string;

}

export class Manager extends Employee {
  name: string = 'Peter';
}

@agent({ compile: AgentCompileType.LazyClass })
class Developer extends Employee {

  current: Project;

  @inject(Manager)
  manager: Manager;

  @failure('not found')
  get supervisor(): string {
    return this.manager.name;
  }

  @failure('n/a')
  shouldGotNA() {
    throw new Error('Failure attribute method');
  }

  @failure(100)
  get shouldGet100() {
    throw new Error('Failure attribute getter');
  }

  constructor(name: string) {
    super();
    this.name = name;
    this.current = { name: 'Tox' };

    console.log(`Create new Developer instance`);
    console.log(`Your manager is ${this.manager.name}`);
    console.log(`Your project is ${JSON.stringify(this.project)}`);
    console.log(`Should got n/a: ${this.shouldGotNA()}`);
    console.log(`Should got 100: ${this.shouldGet100}`);
    // console.log(`Your supervisor is ${this.supervisorName()} (fail safe)`);
    // console.log(`Your supervisor is ${this.supervisor.name}`);
  }

}

describe('@debug', () => {

  describe('# should able to access injected property in constructor', () => {

    it('new instance', () => {

      const developer = new Developer('ling');
      const prototype = Reflect.getPrototypeOf(developer);


      expect(developer instanceof Developer).toBe(true);
      expect(prototype).toBe(Developer.prototype);

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

