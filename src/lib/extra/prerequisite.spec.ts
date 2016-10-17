import { agent } from '../agent'
import { prerequisite } from './prerequisite';

@agent('PrerequisiteAgent')
class TestPrerequisiteAgentClass {

  bool: boolean = true;

  @prerequisite('bool', true, 'require bool == true')
  testBool(): any {
    return 1102
  }

  @prerequisite('bool', false, 'require bool == false')
  testBoolNotSatisfy(): any {
    return 2201
  }

  @prerequisite('bool', false, new Error('november'))
  testBoolNotSatisfyAndCustomError(): any {
    return 2222
  }

}

describe('@prerequisite', () => {

  describe('# should able to', () => {

    it('get result', () => {
      const prerequisiteAgent = new TestPrerequisiteAgentClass();
      expect(prerequisiteAgent.testBool()).toBeDefined();
      expect(prerequisiteAgent.testBool()).toEqual(1102);
    });

    it('get error', () => {
      const prerequisiteAgent = new TestPrerequisiteAgentClass();
      expect(() => {
        prerequisiteAgent.testBoolNotSatisfy()
      }).toThrow(new Error('require bool == false'));
    });

    it('get custom error', () => {
      const prerequisiteAgent = new TestPrerequisiteAgentClass();
      expect(() => {
        prerequisiteAgent.testBoolNotSatisfyAndCustomError()
      }).toThrowError('november')
    });

  });

});
