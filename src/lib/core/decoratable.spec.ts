import { decorateClassField } from './decorator';
import { agent } from '../agent';

describe('core.decoratable', () => {
  describe('# should not able to', () => {
    it('decorate null attribute', () => {
      @agent()
      class Tester01 {
        @decorateClassField(null)
        field;
      }
    });
  });
});
