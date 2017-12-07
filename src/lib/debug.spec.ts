import { agent } from './agent'
import { decorateClass } from './core/decorator';
import { inject } from './extra/inject';
import { failure } from './extra/failure';


export function id(identifier?: any) {
  return decorateClass(new IdAttribute(identifier));
}

export class IdAttribute {
  constructor(private _identifier?: any) {
  }
  
  get identifier() {
    return this._identifier;
  }
}

export interface IHaveName {
  name: string
}

export class Project {
  name = 'Agent Framework';
}


export class Employee implements IHaveName {
  
  @inject(Project)
  project: IHaveName;
  
  name: string;
  
}

export class Manager extends Employee {
  name: string = 'Peter';
}

@agent()
class Developer extends Employee {
  
  friend: IHaveName;
  
  @inject(Manager)
  manager: IHaveName;
  
  @inject('Manager')
  get supervisor(): Manager {
    throw new Error('Supervisor not injected');
  }
  
  @failure('n/a')
  supervisorName() {
    return this.supervisor.name;
  }
  
  constructor(name: string) {
    super();
    this.name = name;
    this.friend = { name: 'Tox' };
    console.log(`Create new Developer instance`);
    console.log(`Your manager is ${this.manager.name}`);
    console.log(`Your project is ${this.project.name}`);
    // console.log(`Your supervisor is ${this.supervisorName()} (fail safe)`);
    // console.log(`Your supervisor is ${this.supervisor.name}`);
  }
  
}

describe('@debug', () => {
  
  describe('# should able to access injected property in constructor', () => {
    
    it('new instance', () => {
      
      const developer = new Developer('ling');
      const prototype = Reflect.getPrototypeOf(developer);
      
      expect(developer instanceof Developer).toBe(true);
      expect(prototype).toBe(Developer.prototype);
      
      // expect(Reflect.getPrototypeOf(Manager)).toBe(Function.prototype);
      // expect(Reflect.getPrototypeOf(Creature)).toBe(Function.prototype);
    });
    
    
    // it('new instance', () => {
    //   const developer = new Developer();
    //   const proto = Reflect.getPrototypeOf(developer);
    //   // const proto2 = Developer.prototype;
    //   expect(developer instanceof Developer).toBe(true);
    //   expect(Reflect.getPrototypeOf(developer)).toBe(Developer.prototype);
    //   expect(Reflect.getPrototypeOf(Developer)).toBe(Function.prototype);
    //   expect(Reflect.getPrototypeOf(Project)).toBe(Function.prototype);
    // });
    
    // it('construct instance', () => {
    //   const developer = Reflect.construct(Developer, []);
    //   expect(Reflect.getPrototypeOf(developer)).toBe(Developer.prototype);
    //   expect(developer instanceof Developer).toBe(true);
    // });
    
  });
  
});

