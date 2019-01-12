import {
  decorateClassMember,
  PropertyFilters,
  Reflector
} from '../../../src/lib';
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
      expect(() => {
        Reflector(MongoDB).findProperties(PropertyFilters.FilterFeatures);
      }).toThrow();
    });

    it('search by attribute', () => {
      Reflector(MongoDB).findProperties(PropertyFilters.FilterAttribute);
    });
  });
});
