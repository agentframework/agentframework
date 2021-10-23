import { agent, transit, CreateAgent, singleton } from '../../../src/dependencies/agent';

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

    it('run homepage example using CreateAgent api', () => {
      class ComponentA {
        name = 'Agent Framework';
      }

      class ProjectA {
        // @transit decorator creates a new instance of ComponentA
        // and assign to component field
        @transit()
        readonly component!: ComponentA;
      }

      // CreateAgent() will upgrade ProjectA class to an agent
      // so the @transit will take effects
      // CreateAgent won't create any domain. so @singleton will not work in this example.
      const ProjectA$ = CreateAgent(ProjectA);

      const project = new ProjectA$();

      expect(project).toBeInstanceOf(ProjectA);
      expect(project.component.name).toBe('Agent Framework');
    });

    it('run advanced homepage example using @agent decorator', () => {
      class ComponentB {
        name = 'ComponentB';
      }

      class ComponentA {
        name = 'Agent Framework';

        @singleton()
        readonly child!: ComponentB;
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
      expect(project.component.child).toBeDefined();
      expect(project.component.child.name).toBe('ComponentB');
    });
  });
});
