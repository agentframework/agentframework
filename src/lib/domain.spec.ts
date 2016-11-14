import { agent } from './agent'
import { success } from './extra/success';
import { Domain } from './domain';

@agent('TestAgent')
class Agent {

  constructor(private _domain: Domain<any>, private _name: string) {
    // console.log('_name', _name);
  }

  @success('tested', true)
  test(): string {
    return `Hello, ${this._name}`;
  }

}

describe('@domain', () => {

  describe('# should able to', () => {

    it('create new instance', () => {
      const domain1 = new Domain<any>();
      const agent1 = domain1.createAgent(Agent, 'Domain');
      expect(Reflect.getPrototypeOf(agent1)).toBe(Agent.prototype);
      expect(agent1 instanceof Agent).toBe(true);
      expect(agent1.test()).toEqual('Hello, Domain');
      expect(agent1['tested']).toBe(true);
    });

  });

  describe('# should not able to', () => {
    
    it('create same agent again', () => {
      const domain2 = new Domain<any>();
      const agent1 = domain2.createAgent(Agent, 'Domain');
      expect(() => {
        const agent2 = domain2.createAgent(Agent, 'Domain');
      }).toThrowError()
    });
    
  });
  
});
