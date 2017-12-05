import { agent } from './agent'
import { inject } from './extra/inject';
import { failure } from './extra/failure';

@agent('Manager')
class Manager {
  name = 'Mgmt. Peter';
}

@agent()
class Developer {

  @inject('Manager')
  manager: Manager;

  @inject('Manager')
  get supervisor(): Manager {
    return {} as Manager;
  }

  constructor() {
    // The filed already been inject before constructor!!!
    console.log(`Your manager is ${this.manager.name}`);
    // console.log(`Your manager is ${this.supervisor.name}`);
  }

  @failure('n/a')
  name() {
    return this.manager.name;
  }

}


describe('@agent', () => {

  describe('# should able to inject before constructor', () => {

    it('create instance with @inject', () => {

      const developer = new Developer();
      console.log('supervisor', developer.supervisor);
      expect(developer instanceof Developer).toBe(true);

    });

  });

});


// it('construct instance', () => {
//   const agent = Reflect.construct(Agent, []);
//   expect(Reflect.getPrototypeOf(agent)).toBe(Agent.prototype);
//   expect(agent instanceof Agent).toBe(true);
// });
