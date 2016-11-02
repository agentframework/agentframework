import { agent } from './agent'
import { success } from './extra/success';

@agent('Agent')
class Agent {

  @success('count1', 100)
  count1: number;

  @success('tested', true)
  test(): boolean {
    return true;
    // throw new Error('debug');
  }
}

@agent('AnotherAgent')
class AnotherAgent extends Agent {

  @success('count2', 200)
  count2: number;

  @success('getter2num', 300)
  get getter2(): number {
    return 10;
  }

  @success('isready', true)
  ready(): boolean {
    return this.test();
  }
}


describe('@agent', () => {

  describe('# should able to', () => {

    it('new instance', () => {
      const agent = new Agent();
      expect(Reflect.getPrototypeOf(agent)).toBe(Agent.prototype);
      expect(agent instanceof Agent).toBe(true);
      agent.test();
      expect(agent['tested']).toBe(true);
    });

    it('new ', () => {
      const agent = new AnotherAgent();
      expect(Reflect.getPrototypeOf(agent)).toBe(AnotherAgent.prototype);
      expect(agent instanceof AnotherAgent).toBe(true);
      expect(agent.ready()).toBe(true);
      expect(agent['isready']).toBe(true);
    });

    it('construct instance', () => {
      const agent = Reflect.construct(Agent, []);
      expect(Reflect.getPrototypeOf(agent)).toBe(Agent.prototype);
      expect(agent instanceof Agent).toBe(true);
    });

  });

});
