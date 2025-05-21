import { agent, transit } from 'agentframework';

describe('Hello world!', () => {
  describe('# should able to', () => {
    it('run homepage example using @agent decorator', () => {
      class ComponentA {
        name = 'Agent Framework';
      }

      // @agent decorator will upgrade this class to an agent
      // without @agent decorator the @transit will take no effect
      @agent()
      class ProjectA {
        // @transit decorator creates a new instance of ComponentA
        // and assign to component field
        @transit()
        readonly component!: ComponentA;
      }

      const project = new ProjectA();

      expect(project).toBeInstanceOf(ProjectA);
      expect(project.component.name).toBe('Agent Framework');
    });
  });
});
