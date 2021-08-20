import { OnDemandTypeInfo } from './OnDemandTypeInfo';

class BaseType {}

class UserType extends BaseType {}

describe('OnDemandTypeInfo', () => {
  describe('# should able to', () => {
    it('get type info for Object instance', () => {
      const info = OnDemandTypeInfo.find({});
      expect(info).toBeDefined();
    });
    it('get type info for Object', () => {
      const info = OnDemandTypeInfo.find(Object);
      expect(info).toBeDefined();
    });
    it('get type info for Object.prototype', () => {
      const info = OnDemandTypeInfo.find(Object.prototype);
      expect(info).toBeDefined();
    });
    it('get type info for Function', () => {
      const info = OnDemandTypeInfo.find(Function);
      expect(info).toBeDefined();
    });
    it('get type info for Function.prototype', () => {
      const info = OnDemandTypeInfo.find(Function.prototype);
      expect(info).toBeDefined();
    });
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
    it('get base for Object instance', () => {
      const info = OnDemandTypeInfo.find({});
      expect(info.base).toBeUndefined();
    });
    it('get base for Object', () => {
      const info = OnDemandTypeInfo.find(Object);
      expect(info.base).toBeUndefined();
    });
    it('get base for Object.prototype', () => {
      const info = OnDemandTypeInfo.find(Object.prototype);
      expect(info.base).toBeUndefined();
    });
    it('get base for Function', () => {
      const info = OnDemandTypeInfo.find(Function);
      expect(info.base).toBeUndefined();
    });
    it('get base for Function.prototype', () => {
      const info = OnDemandTypeInfo.find(Function.prototype);
      expect(info.base).toBeUndefined();
    });
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
