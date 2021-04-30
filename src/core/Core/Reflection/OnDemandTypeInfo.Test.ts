import { OnDemandTypeInfo } from './OnDemandTypeInfo';

class BaseType {}

class UserType extends BaseType {}

describe('OnDemandTypeInfo', () => {
  describe('# should able to', () => {
    it('get base from type', () => {
      const info = OnDemandTypeInfo.find(UserType);
      expect(info).toBeInstanceOf(OnDemandTypeInfo);
      expect(info.base).toBe(OnDemandTypeInfo.find(BaseType));
    });

    it('get base from prototype', () => {
      const info = OnDemandTypeInfo.find(UserType.prototype);
      expect(info).toBeInstanceOf(OnDemandTypeInfo);
      expect(info.base).toBe(OnDemandTypeInfo.find(BaseType.prototype));
    });
  });

  describe('# should not able to', () => {
    it('get base from type', () => {
      const info = OnDemandTypeInfo.find(BaseType);
      expect(info).toBeInstanceOf(OnDemandTypeInfo);
      expect(info.base).toBeUndefined();
    });

    it('get base from prototype', () => {
      const info = OnDemandTypeInfo.find(BaseType.prototype);
      expect(info).toBeInstanceOf(OnDemandTypeInfo);
      expect(info.base).toBeUndefined();
    });
  });
});
