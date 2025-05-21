/* tslint:disable */

import { decorate, AgentFrameworkError, MemberKinds } from '../../../lib/dependencies/agent';
import { MetadataAttribute } from '../1.attributes/MetadataAttribute';

const a = new MetadataAttribute();
const noTarget = MemberKinds.None;

describe('decorate() and Not Allowed Target', () => {
  describe('# should not able to', () => {
    it('decorate constructor', () => {
      expect(() => {
        @decorate(a, noTarget)
        class MongoDB {}
        expect(MongoDB).toBeTruthy();
      }).toThrowError(AgentFrameworkError, 'InvalidDecorator: MetadataAttribute is not allow decorate on class');
    });

    it('decorate class field', () => {
      expect(() => {
        class MongoDB {
          @decorate(a, noTarget)
          random!: Date;
        }
        expect(MongoDB).toBeTruthy();
      }).toThrowError(AgentFrameworkError, 'InvalidDecorator: MetadataAttribute is not allow decorate on property');
    });

    it('decorate class non-function field', () => {
      expect(() => {
        function MongoDB() {}
        Reflect.defineProperty(MongoDB.prototype, 'random', { value: 1 });
        const descr = Reflect.getOwnPropertyDescriptor(MongoDB.prototype, 'random');
        // another kind of class and decorator
        decorate(a, noTarget)(MongoDB.prototype, 'random', descr);
      }).toThrowError(AgentFrameworkError, 'InvalidDecorator: MetadataAttribute is not allow decorate on property');
    });

    it('decorate constructor parameter', () => {
      expect(() => {
        class MongoDB {
          constructor(p1: number, @decorate(a, noTarget) p2: Date) {}
        }
        expect(MongoDB).toBeTruthy();
      }).toThrowError(
        AgentFrameworkError,
        'InvalidDecorator: MetadataAttribute is not allow decorate on constructor parameters'
      );
    });
    it('decorate method', () => {
      expect(() => {
        class MongoDB {
          @decorate(a, noTarget)
          round(p1: string, p2: Date): any {}
        }
        expect(MongoDB).toBeTruthy();
      }).toThrowError(AgentFrameworkError, 'InvalidDecorator: MetadataAttribute is not allow decorate on property');
    });
    it('decorate method parameter', () => {
      expect(() => {
        class MongoDB {
          round(p1: string, @decorate(a, noTarget) p2: Date): any {}
        }
        expect(MongoDB).toBeTruthy();
      }).toThrowError(
        AgentFrameworkError,
        'InvalidDecorator: MetadataAttribute is not allow decorate on method parameters'
      );
    });
    it('decorate getter', () => {
      expect(() => {
        class MongoDB {
          @decorate(a, noTarget)
          get dob(): Date {
            return new Date();
          }
        }
        expect(MongoDB).toBeTruthy();
      }).toThrowError(AgentFrameworkError, 'InvalidDecorator: MetadataAttribute is not allow decorate on property');
    });
    it('decorate setter', () => {
      expect(() => {
        class MongoDB {
          @decorate(a, noTarget)
          set date(d: Date) {
            // console.log('set', d);
          }
        }
        expect(MongoDB).toBeTruthy();
      }).toThrowError(AgentFrameworkError, 'InvalidDecorator: MetadataAttribute is not allow decorate on property');
    });
  });
});
