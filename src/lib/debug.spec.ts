import { agent } from './agent'
import { inject } from './extra/inject';
import { failure } from './extra/failure';

@agent('Manager')
class Manager {
  name = 'Peter';
}

@agent()
class Agent {

  @inject('Manager')
  manager: Manager;
  
  @inject('Manager')
  get supervisor() {
    return 'ling';
  }
  
  set supervisor(value) {
    console.log('supervisor is', value);
  }
  
  constructor() {
    // The filed already been inject before constructor!!!
    console.log(`Your manager is ${this.manager.name}`);
  }
  
  @failure('n/a')
  name() {
    return this.manager.name;
  }
  
}


describe('@agent', () => {

  describe('# should able to inject before constructor', () => {

    it('create instance with @inject', () => {
      const agent = new Agent();
      expect(agent instanceof Agent).toBe(true);
    });

  });

});


// it('construct instance', () => {
//   const agent = Reflect.construct(Agent, []);
//   expect(Reflect.getPrototypeOf(agent)).toBe(Agent.prototype);
//   expect(agent instanceof Agent).toBe(true);
// });
