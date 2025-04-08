import { Initializer, initializable, agent } from 'agentframework';

describe('6.1. @initializable decorator', () => {
  describe('# should not able to', () => {
    it('create agent with invalid class initializer', () => {
      @agent()
      @initializable()
      class App621 {
        static [Initializer] = {};
      }
      expect(():any => {
        new App621();
      }).toThrowError('ClassInitializerIsNotFunction');
    });

    // it('create agent with null class initializer', () => {
    //   @agent()
    //   @initializable()
    //   class App622 {
    //     static [Initializer]() {
    //       return null;
    //     }
    //   }
    //   expect(():any => {
    //     new App622();
    //   }).toThrowError('ConstructorReturnNonObject');
    // });
    //
    // it('create agent with undefined class initializer', () => {
    //   @agent()
    //   @initializable()
    //   class App623 {
    //     static [Initializer]() {}
    //   }
    //   expect((): any => {
    //     new App623();
    //   }).toThrowError('ConstructorReturnNonObject');
    // });
    //
    // it('create agent with number class initializer', () => {
    //   @agent()
    //   @initializable()
    //   class App623 {
    //     static [Initializer]() {
    //       return 1;
    //     }
    //   }
    //   expect((): any => {
    //     new App623();
    //   }).toThrowError('ConstructorReturnNonObject');
    // });
    //
    // it('create agent with invalid class initializer', () => {
    //   @agent()
    //   @initializable()
    //   class App624 {
    //     [Initializer] = 1;
    //   }
    //   expect((): any => {
    //     new App624();
    //   }).toThrowError('InitializerIsNotFunction');
    // });
  });
});
