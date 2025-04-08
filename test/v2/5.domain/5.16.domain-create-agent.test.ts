import { Reflector } from '../../../packages/dependencies/agent';
import {
  singleton,
  transit,
  inject,
  TransitAttribute,
  SingletonAttribute,
  InjectAttribute,
  CreateDomainAgent,
  GetSystemDomain
} from '../../../packages/dependencies/domain';

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

      const domain = GetSystemDomain();
      expect(domain).toBeTruthy();

      const DomainAgentType5161 = CreateDomainAgent(domain, DomainAgent5161);
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
