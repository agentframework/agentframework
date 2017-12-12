import { inject } from '../extra/inject';
import { normalize } from '../extra/normalize';
import { AgentCompileType } from './compiler';
import { agent } from '../agent';
import { Lookup } from './lookup';


class Project {
  name = 'Agent Framework';
}

class Employee {

  @inject(Employee)
  manager: Employee;

  @normalize()
  getManagerName() {
    return this.manager;
  }

}

@agent({ compile: AgentCompileType.LazyClass })
class Developer extends Employee {

  @inject(Project)
  @normalize()
  project: Project;

  @inject(Project)
  @normalize()
  current = new Project();

  future = new Project();

  @normalize()
  get working() {
    return new Project();
  }

  @normalize()
  employeeMethod() {
    return new Project();
  }

}

describe('Lookup', () => {

  describe('# should able to', () => {

    it('get all initializers', () => {

      const initializers = Lookup.findInitializers(Developer);

      // @inject is an initializer
      expect(initializers.length).toBe(3);

    });

    it('get all interceptors', () => {

      const interceptors = Lookup.findInterceptors(Developer);

      // @inject is an initializer
      expect(interceptors.length).toBe(5);

    });

  });

});

