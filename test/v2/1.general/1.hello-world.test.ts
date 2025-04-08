import { agent, singleton, transit } from 'agentframework';

import { SingletonAttribute } from '../../../packages/dependencies/decorators';
import { CreateAgent, decorateVariable } from '../../../packages/dependencies/agent';

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

    it('run homepage example using @agent decorator and parameter injection', () => {
      class ComponentA {
        name = 'Agent Framework';
      }

      @agent()
      class ProjectA {
        constructor(@singleton() readonly component: ComponentA) {
          expect(this.component).toBeDefined();
          expect(this.component.name).toBe('Agent Framework');
        }
      }

      const project = Reflect.construct(ProjectA, []);

      expect(project).toBeInstanceOf(ProjectA);
      expect(project.component.name).toBe('Agent Framework');
    });

    it('run homepage example using @agent decorator and variable decorator', () => {
      class ComponentA {
        name = 'Agent Framework';
      }

      @agent()
      class ProjectA {
        constructor(@decorateVariable(new SingletonAttribute()) readonly component: ComponentA) {
          expect(this.component).toBeDefined();
          expect(this.component.name).toBe('Agent Framework');
        }

        test(@decorateVariable(new SingletonAttribute()) component?: ComponentA) {
          expect(component).toBeDefined();
          expect(component).toBeInstanceOf(ComponentA);
          return component;
        }
      }

      const project = Reflect.construct(ProjectA, []);

      expect(project).toBeInstanceOf(ProjectA);
      expect(project.component.name).toBe('Agent Framework');
      expect(project.test()).toBeDefined();
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

    it('run homepage example with not-allowed decorators', () => {
      class NotAllowed {
        beforeDecorate(
          target: Object | Function,
          targetKey?: string | symbol,
          descriptor?: PropertyDescriptor | number
        ): boolean {
          return false;
        }
      }

      class ComponentA {
        name = 'Agent Framework';
      }

      @agent()
      class ProjectA {
        constructor(@decorateVariable(new NotAllowed()) readonly component: ComponentA) {
        }

        test(@decorateVariable(new NotAllowed()) component?: ComponentA) {
          return component;
        }
      }

      const project = Reflect.construct(ProjectA, []);

      expect(project).toBeInstanceOf(ProjectA);
      expect(project.component).toBeUndefined();
      expect(project.test()).toBeUndefined();
    });

    it('run modified homepage example using @agent decorator', () => {
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
