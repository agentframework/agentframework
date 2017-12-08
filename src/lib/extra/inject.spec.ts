import { agent } from '../agent'
import { inject } from './inject';
import { failure } from './failure';

@agent('Util')
class UtilAgent {

  constructor() {
    // console.log('calling UtilAgent ctor');
  }

  format(str: string, name: string) {
    return str + name;
  }

}


@agent('TestService')
class TestServiceAgent {

  @inject('Util')
  util: UtilAgent;


  constructor() {
    // console.log('calling TestServiceAgent ctor');
  }

  hello() {
    return 'Hello' + this.util.format(',', 'Name');
  }

}

@agent('Test')
class TestAgent {

  @inject(TestServiceAgent)
  serviceAgent: TestServiceAgent;

  @inject('TestService')
  serviceAgentById: TestServiceAgent;

  constructor() {
    // console.log('calling Test ctor', this.serviceAgent);
  }

}

@agent('Test2')
class TestAgent2 {

  @inject('Util2')
  util2: UtilAgent;

}

interface IHaveName {
  name: string
}

class Project implements IHaveName {
  name = 'Agent Framework';
}

@agent()
class Manager implements IHaveName {
  name = 'Peter';
}

@agent()
class Developer {

  @inject(Manager)
  manager: IHaveName;

  @inject(Manager)
  get supervisor(): IHaveName {
    throw new Error('Supervisor not injected');
  }

  constructor() {
    // The filed already been inject before constructor!!!
    if (this.manager.name !== 'Peter') {
      throw new Error('Unable to access injected property')
    }
  }

  @failure('n/a')
  name() {
    return this.manager.name;
  }

}


describe('@inject', () => {

  describe('# should able to', () => {

    it('without domain', () => {
      const test = new TestAgent();
      // console.log('test', Object.getPrototypeOf(test), test);
      expect(test.serviceAgent).toBeDefined();
      expect(test.serviceAgent).toEqual(test.serviceAgentById);
      expect(test.serviceAgent.hello()).toEqual('Hello,Name');
    });

  });

  describe('# should not able to', () => {

    it('non-exist agent', () => {
      expect(() => {
        const test = new TestAgent2();
      }).toThrowError('Agent Util2 not found');
    });

  });

  describe('# should able to access injected property in constructor', () => {

    it('new instance', () => {
      const developer = new Developer();

      expect(developer instanceof Developer).toBe(true);
      expect(Reflect.getPrototypeOf(developer)).toBe(Developer.prototype);
      expect(Reflect.getPrototypeOf(Developer)).toBe(Function.prototype);
      expect(Reflect.getPrototypeOf(Project)).toBe(Function.prototype);
      expect(developer.manager.name).toBe('Peter');
      expect(developer.supervisor.name).toBe('Peter');
    });

    it('construct instance', () => {
      const developer = Reflect.construct(Developer, []);

      expect(developer instanceof Developer).toBe(true);
      expect(Reflect.getPrototypeOf(developer)).toBe(Developer.prototype);
      expect(Reflect.getPrototypeOf(Developer)).toBe(Function.prototype);
      expect(Reflect.getPrototypeOf(Project)).toBe(Function.prototype);
      expect(developer.manager.name).toBe('Peter');
      expect(developer.supervisor.name).toBe('Peter');
    });

  });
});
