import { OnDemandTypeInfo } from '../../src/core/Core/Reflection/OnDemandTypeInfo';

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
  });
});
