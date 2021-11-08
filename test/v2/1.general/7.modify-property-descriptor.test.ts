describe('Property Descriptor!', () => {
  describe('# should able to', () => {
    it('modify property descriptor', () => {
      const pb: any = {
        get() {
          return 'hello';
        },
        configurable: true,
      };

      class Tester {
        say!: string;
      }

      class Tester2 extends Tester {}

      Reflect.defineProperty(Tester2.prototype, 'say', pb);

      const tester: any = new Tester2();

      expect(tester.say).toBe('hello');

      pb.get = function () {
        return 'world';
      };
      Reflect.defineProperty(Tester2.prototype, 'say', pb);

      expect(tester.say).toBe('world');
    });
  });
});
