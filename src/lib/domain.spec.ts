import { agent } from './agent'
import { success } from './extra/success';
import { Domain } from './domain';

class Base {

}

@agent('TestAgent')
@agent('TestAgent2')
class Agent extends Base {

  constructor(private _domain: Domain, private _name: string) {
    super();
  }

  @success('tested', true)
  test(): string {
    return `Hello, ${this._name}`;
  }

}

describe('@domain', () => {

  describe('# should able to', () => {

    it('create new instance', () => {
      const domain1 = new Domain();
      const agent1 = domain1.createAgent(Agent, 'Domain');
      expect(Reflect.getPrototypeOf(agent1)).toBe(Agent.prototype);
      expect(agent1 instanceof Agent).toBe(true);
      expect(agent1.test()).toEqual('Hello, Domain');
      expect(agent1['tested']).toBe(true);
    });

  });

  // describe('# should not able to', () => {
  //
  //   it('create same agent again', () => {
  //     const domain2 = new Domain<any>();
  //     domain2.createAgent(Agent, 'Domain');
  //     expect(() => {
  //       domain2.createAgent(Agent, 'Domain');
  //     }).toThrowError()
  //   });
  //
  // });

});
