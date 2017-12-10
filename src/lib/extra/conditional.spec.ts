import { agent } from '../agent'
import { conditional } from './conditional';
import { Reflector } from '../core/reflector';

@agent()
class TestAgentClass {

  bool: boolean = true;
  value: number = 0;

  @conditional('bool', false)
  notMet(): void {
    this.value = 100;
  }

  @conditional('bool', true)
  met(): void {
    this.value = 200;
  }

}


describe('@conditional', () => {

  describe('# should not able to', () => {
    it('change value', () => {
      const conditionalAgent = new TestAgentClass();
      conditionalAgent.notMet();
      const reflection = Reflector(TestAgentClass);
      expect(reflection.property('notMet').type).toEqual(Function);
      expect(reflection.property('notMet').paramtypes).toEqual([]);
      expect(reflection.property('notMet').returntype).toEqual(undefined);
      expect(conditionalAgent.value).toEqual(0);
    });
  });

  describe('# should able to', () => {
    it('change value', () => {
      const conditionalAgent = new TestAgentClass();
      conditionalAgent.met();
      expect(conditionalAgent.value).toEqual(200);
    });
  });

});
