import { agent } from './agent'
import { success } from './extra/success';

class Base {
  
  @success('tested', true)
  test(): boolean {
    return true;
    // throw new Error('debug');
  }
}

@agent()
class TheAgent extends Base {

  @success('isready', true)
  ready(): boolean {
    return this.test();
  }
}

describe('@agent', () => {

  describe('# should able to', () => {

    it('new instance', () => {
      const agent = new Base();
      expect(agent instanceof Base).toBe(true);
      agent.test();
      // because base is not an agent
      expect(agent['tested']).toBeFalsy();
    });

    it('new agent', () => {
      const agent = new TheAgent();
      expect(agent instanceof TheAgent).toBe(true);
      expect(typeof agent.ready).toBe('function');
      expect(agent.ready()).toBe(true);
      expect(agent['isready']).toBe(true);
    });

    it('construct instance', () => {
      const base = Reflect.construct(Base, []);
      expect(Reflect.getPrototypeOf(base)).toBe(Base.prototype);
      expect(base instanceof Base).toBe(true);
    });
    
    it('construct agent', () => {
      const agent = Reflect.construct(TheAgent, []);
      expect(agent instanceof Base).toBe(true);
    });
  });

});
