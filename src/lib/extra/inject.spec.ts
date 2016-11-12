import { agent } from '../agent'
import { inject } from './inject';

@agent('Util')
class UtilAgent {

  constructor() {
    console.log('calling UtilAgent ctor');
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
    console.log('calling TestServiceAgent ctor');
  }

  hello() {
    return 'Hello' + this.util.format(',', 'Name');
  }

}

@agent('Test')
class TestAgent {

  @inject(TestServiceAgent)
  serviceAgent: TestServiceAgent;

  constructor() {
    console.log('calling Test ctor', this.serviceAgent);
  }

}

@agent('Test2')
class TestAgent2 {

  @inject('Util2')
  util2: UtilAgent;

}

describe('@inject', () => {

  describe('# should able to', () => {

    it('without domain', () => {
      const test = new TestAgent();
      // console.log('test', Object.getPrototypeOf(test), test);
      expect(test.serviceAgent).toBeDefined();
      expect(test.serviceAgent.hello()).toEqual('Hello,Name');
    });

  });

  describe('# should not able to', () => {

    it('non-exist agent', () => {
      expect(() => {
        const test = new TestAgent2();
      }).toThrowError('Util2 not found');
    });

  });
});
