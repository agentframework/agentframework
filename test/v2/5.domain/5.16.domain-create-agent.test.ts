import { Reflector } from '../../../src/dependencies/agent';
import {
  singleton,
  transit,
  inject,
  TransitAttribute,
  SingletonAttribute,
  InjectAttribute,
  CreateDomainAgent,
  GetGlobalDomain,
} from '../../../src/dependencies/domain';

describe('5.16. Domain create agent', () => {
  describe('# should able to', () => {
    it('create domain agent', () => {
      class Service5161 {}

      class DomainAgent5161 {
        @transit()
        readonly t1?: Service5161;
        @singleton()
        readonly t2?: Service5161;
        @inject()
        readonly t3?: Service5161;
      }

      const domain = GetGlobalDomain();
      expect(domain).toBeTruthy();

      const DomainAgentType5161 = CreateDomainAgent(DomainAgent5161);
      expect(DomainAgentType5161).toBeTruthy();

      const type = Reflector(DomainAgentType5161);
      expect(type.property('t1').hasOwnAttribute(TransitAttribute));
      expect(type.property('t2').hasOwnAttribute(SingletonAttribute));
      expect(type.property('t3').hasOwnAttribute(InjectAttribute));

      const domainAgent: DomainAgent5161 = domain.construct(DomainAgentType5161);
      expect(domainAgent.t1).toBeInstanceOf(Service5161)
      expect(domainAgent.t2).toBeInstanceOf(Service5161)
      expect(domainAgent.t3).toBeInstanceOf(Service5161)
    });
  });
});
