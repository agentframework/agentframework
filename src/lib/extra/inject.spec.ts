import { agent } from '../agent'
import { inject } from './inject';
import { failure } from './failure';

interface IHaveName {
  name: string
}

class Project implements IHaveName {
  name = 'Agent Framework';
}

@agent()
class Manager implements IHaveName {
  name = 'Peter';
}

@agent()
class Supervisor {

  @inject('Supervisor')
  manager;

}

@agent()
class Developer {

  @inject()
  manager: Manager;

  get supervisor(): IHaveName {
    throw new Error('Supervisor not injected');
  }

  constructor(@inject() supervisor?: Supervisor) {
    // The filed already been inject before constructor!!!
    if (this.manager.name !== 'Peter') {
      throw new Error('Unable to access injected property')
    }
  }

  @failure('n/a')
  name() {
    return this.manager.name;
  }

}


describe('@inject', () => {

  describe('# should able to', () => {

    it('without domain', () => {
      const developer = new Developer();
      expect(developer.manager).toBeDefined();
    });

  });

  describe('# should not able to', () => {

    it('non-exist agent', () => {
      expect(() => {
        const test = new Supervisor();
        expect(test).toBeUndefined();
      }).toThrowError('Not supported dependence injection from identifier');
    });

  });

  describe('# should able to access injected property in constructor', () => {

    it('new instance', () => {
      const developer = new Developer();

      expect(developer instanceof Developer).toBe(true);
      expect(Reflect.getPrototypeOf(Developer)).toBe(Function.prototype);
      expect(Reflect.getPrototypeOf(Project)).toBe(Function.prototype);
      expect(developer.manager.name).toBe('Peter');
    });

    it('construct instance', () => {
      const developer = Reflect.construct(Developer, []);

      expect(developer instanceof Developer).toBe(true);
      expect(Reflect.getPrototypeOf(Developer)).toBe(Function.prototype);
      expect(Reflect.getPrototypeOf(Project)).toBe(Function.prototype);
      expect(developer.manager.name).toBe('Peter');
    });
  
    it('shutdown', (done) => {
      // shutdown test to avoid unclosed debugger
      setTimeout(function () {
        process.exit();
        done();
      }, 2000)
    });
    
  });
});
