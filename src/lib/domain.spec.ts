import { agent } from './agent'
import { success } from './extra/success';
import { Domain } from './domain';

class Base {

}

@agent('TestAgent')
@agent('TestAgent2')
class Agent extends Base {

  constructor(private _domain: Domain, private _name?: string) {
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

    it('add agent', () => {
      const domain1 = new Domain();
      domain1.addAgent(Agent);
      const a1 = domain1.getAgent('TestAgent');
      const a2 = domain1.getAgent('TestAgent2');
      expect(a1).toEqual(a2);
    });

  });

  describe('# should not able to', () => {

    it('create same agent again', () => {
      const domain2 = new Domain();
      domain2.createAgent(Agent, 'Domain');
      expect(() => {
        domain2.createAgent(Agent, 'Domain');
      }).toThrowError()
    });

    it('add agent twice', () => {
      const domain1 = new Domain();
      domain1.addAgent(Agent);
      expect(() => {
        domain1.addAgent(Agent);
      }).toThrowError('Duplicated agent type identifier TestAgent2 is not allowed');

    });

    it('create same agent again', () => {
      const domain1 = new Domain();
      domain1.addAgent(Agent);
      const a1 = domain1.getAgent('TestAgent');
      const a2 = domain1.getAgent('TestAgent2');
      expect(a1).toEqual(a2);
      expect(() => {
        domain1.createAgent(Agent);
      }).toThrowError('Can not create agent. Duplicated agent identifier TestAgent2 is not allowed');
    });

    it('add same agent again', () => {
      const domain1 = new Domain();
      domain1.createAgent(Agent);
      expect(() => {
        domain1.addAgent(Agent);
      }).toThrowError('Can not add agent type. Duplicated agent type identifier TestAgent2 is not allowed');
    });

    it('add same agent and new again', () => {
      const domain1 = new Domain();
      domain1.createAgent(Agent);
      expect(() => {
        const a1 = new Agent(domain1);
      }).toThrowError('Duplicated agent identifier TestAgent2 is not allowed');
    });

  });

});
