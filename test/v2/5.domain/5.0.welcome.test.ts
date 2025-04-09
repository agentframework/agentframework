import { InMemoryDomain } from '../../../packages/dependencies/domain';
import { transit } from '@agentframework/decorators';

describe('Hello world!', () => {
  describe('# should able to', () => {

    it('run homepage example using domain api', () => {
      class ComponentA {
        name = 'Agent Framework';
      }

      class ProjectA {
        // @transit decorator creates a new instance of ComponentA
        // and assign to component field
        @transit()
        readonly component!: ComponentA;
      }

      const domain = new InMemoryDomain();
      const project = domain.construct(ProjectA);

      expect(project).toBeInstanceOf(ProjectA);
      expect(project.component.name).toBe('Agent Framework');
    });

  });
});
