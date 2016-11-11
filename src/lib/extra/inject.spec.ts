import { agent } from '../agent'
import { inject } from './inject';

@agent('TestService')
class TestServiceAgent {
  
  constructor() {
    console.log('calling TestServiceAgent ctor');
  }
  
  hello() {
    return 'Hello';
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

describe('@inject', () => {

  describe('# should able to', () => {

    it('without domain', () => {
      const test = new TestAgent();
      // console.log('test', Object.getPrototypeOf(test), test);
      expect(test.serviceAgent).toBeDefined();
      expect(test.serviceAgent.hello()).toEqual('Hello');
    });

  });

});
