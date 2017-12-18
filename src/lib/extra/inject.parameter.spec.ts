import { agent } from '../agent'
import { inject } from './inject';
import { failure } from './failure';

class Project {
  name = 'Agent Framework';
}

@agent()
class Developer {
  
  constructor(@inject() project?: Project) {
    // The filed already been inject before constructor!!!
    if (project.name !== 'Agent Framework') {
      throw new Error('Unable to access injected property')
    }
  }
  
}


describe('@inject to parameters', () => {

  describe('# should able to', () => {

    it('without domain', () => {
      const developer = new Developer();
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
