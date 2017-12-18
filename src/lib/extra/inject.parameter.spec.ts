import { agent } from '../agent'
import { inject } from './inject';
import { failure } from './failure';

class Project {
  name: string;
  
  constructor(name) {
    this.name = name || 'Agent Framework'
  }
  
}

@agent()
class Developer {
  
  constructor(@inject() project?: Project) {
    // The filed already been inject before constructor!!!
    if (!project) {
      throw new Error('Unable to access injected property')
    }
  }
  
  @inject()
  field: Project;

  // Not allowed
  // @inject()
  // set project(project: Project) {
  // }
  // get project(): Project {
  //   return null;
  // }
  
}


describe('@inject to parameters', () => {
  
  describe('# should able to', () => {
    
    it('without domain', () => {
      const developer = new Developer(new Project('Root'));
      expect(developer).toBeDefined();
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
