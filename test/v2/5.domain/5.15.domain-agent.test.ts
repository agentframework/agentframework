import { Reflector } from '../../../src/dependencies/agent';
import {
  agent,
  singleton,
  transit,
  inject,
  TransitAttribute,
  SingletonAttribute,
  InjectAttribute
} from '../../../src/dependencies/domain';

describe('5.15. Domain agent', () => {
  describe('# should able to', () => {
    it('create domain agent', () => {
      class Service5151 {}

      @agent()
      @agent()
      class DomainAgent5151 {
        @transit()
        t1?: Service5151;
        @singleton()
        t2?: Service5151;
        @inject()
        t3?: Service5151;
      }

      const type = Reflector(DomainAgent5151)
      expect(type.property('t1').hasOwnAttribute(TransitAttribute))
      expect(type.property('t2').hasOwnAttribute(SingletonAttribute))
      expect(type.property('t3').hasOwnAttribute(InjectAttribute))
    });
  });
});
