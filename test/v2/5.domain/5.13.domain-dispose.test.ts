import { InMemoryDomain } from '../../../lib/dependencies/domain';
import { Arguments, TypeInvocation, initializable, Initializer } from '../../../lib/dependencies/agent';

describe('5.13. Domain dispose', () => {
  describe('# should able to', () => {
    it('dispose domain', () => {
      const domain = new InMemoryDomain();
      domain.dispose();
    });

    it('dispose domain with agent', () => {
      class Agent513B {}
      const domain = new InMemoryDomain();
      domain.construct(Agent513B);
      domain.dispose();
    });

    it('dispose domain with disposable agent', (done) => {
      class Agent513C {
        dispose() {
          done();
        }
      }
      const domain = new InMemoryDomain();
      domain.construct(Agent513C);
      domain.dispose();
    });

    it('dispose domain with slow agent', () => {
      @initializable()
      class Agent513D {
        static [Initializer](target: TypeInvocation, params: Arguments, receiver: Function) {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(target.invoke(params, receiver));
            }, 0);
          });
        }
      }
      const domain = new InMemoryDomain();
      domain.resolve(Agent513D);
      domain.dispose();
    });

    it('dispose domain with disposable slow agent', (done) => {
      @initializable()
      class Agent513E {
        static [Initializer](target: TypeInvocation, params: Arguments, receiver: Function) {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(target.invoke(params, receiver));
            }, 0);
          });
        }
        dispose() {
          done();
        }
      }
      const domain = new InMemoryDomain();
      domain.resolve(Agent513E);
      domain.dispose();
    });
  });
});
