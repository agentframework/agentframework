import { decorateClassMember, Reflector } from '../../../src/lib';
import { RandomAttribute } from '../attributes/RandomAttribute';
import { RoundAttribute } from '../attributes/RoundAttribute';

class MongoDB {
  @decorateClassMember(new RandomAttribute())
  rnd1: any;

  @decorateClassMember(new RoundAttribute())
  connect() {
    return 'connected';
  }
}

describe('Reflection get metadata ', () => {
  describe('# should able to', () => {
    it('search by feature', () => {
      const a = Reflector(MongoDB)
        .property('rnd2')
        .getMetadata('design:type');
      expect(a).toBeUndefined();
    });
  });
});
