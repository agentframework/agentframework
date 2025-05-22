import { OnDemandTypeInfo } from './OnDemandTypeInfo.ts';

class BaseType {}

class UserType extends BaseType {}

describe('OnDemandTypeInfo', () => {
  describe('# should able to', () => {
    it('get type info for Object instance', () => {
      const info = OnDemandTypeInfo.from({});
      expect(info).toBeDefined();
    });
    it('get type info for Object', () => {
      const info = OnDemandTypeInfo.from(Object);
      expect(info).toBeDefined();
    });
    it('get type info for Object.prototype', () => {
      const info = OnDemandTypeInfo.from(Object.prototype);
      expect(info).toBeDefined();
    });
    it('get type info for Function', () => {
      const info = OnDemandTypeInfo.from(Function);
      expect(info).toBeDefined();
    });
    it('get type info for Function.prototype', () => {
      const info = OnDemandTypeInfo.from(Function.prototype);
      expect(info).toBeDefined();
    });
    it('get base from type', () => {
      const info = OnDemandTypeInfo.from(UserType);
      expect(info).toBeInstanceOf(OnDemandTypeInfo);
      expect(info.base).toBe(OnDemandTypeInfo.from(BaseType));
    });
    it('get base from prototype', () => {
      const info = OnDemandTypeInfo.from(UserType.prototype);
      expect(info).toBeInstanceOf(OnDemandTypeInfo);
      expect(info.base).toBe(OnDemandTypeInfo.from(BaseType.prototype));
    });
  });

  describe('# should not able to', () => {
    it('get base for Object instance', () => {
      const info = OnDemandTypeInfo.from({});
      expect(info.base).toBeFalsy();
    });
    it('get base for Object', () => {
      const info = OnDemandTypeInfo.from(Object);
      expect(info.base).toBeFalsy();
    });
    it('get base for Object.prototype', () => {
      const info = OnDemandTypeInfo.from(Object.prototype);
      expect(info.base).toBeFalsy();
    });
    it('get base for Function', () => {
      const info = OnDemandTypeInfo.from(Function);
      expect(info.base).toBeFalsy();
    });
    it('get base for Function.prototype', () => {
      const info = OnDemandTypeInfo.from(Function.prototype);
      expect(info.base).toBeFalsy();
    });
    it('get base from type', () => {
      const info = OnDemandTypeInfo.from(BaseType);
      expect(info).toBeInstanceOf(OnDemandTypeInfo);
      expect(info.base).toBeFalsy();
    });
    it('get base from prototype', () => {
      const info = OnDemandTypeInfo.from(BaseType.prototype);
      expect(info).toBeInstanceOf(OnDemandTypeInfo);
      expect(info.base).toBeFalsy();
    });
  });
});
