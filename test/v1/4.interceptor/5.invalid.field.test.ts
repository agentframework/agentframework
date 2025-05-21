/* tslint:disable */

import { decorateMember, IsAgent, Reflector } from '../../../lib/dependencies/agent';
import { RoundInterceptor } from '../1.attributes/RoundInterceptor';
import { CreateAgent } from '../../../lib/dependencies/agent';

class Calculator {
  @decorateMember(new RoundInterceptor())
  RoundOnField!: number;
}

class Foo {
  @decorateMember(new RoundInterceptor())
  bar!: number;
}

class Bar {
  @decorateMember(new RoundInterceptor())
  foo!: number;
}

// Reflect.defineProperty(Calculator.prototype, 'RoundOnField', {
//   value: 1,
// });

describe('Interceptor on Field', () => {
  describe('# should able to', () => {
    it('define agent', () => {
      expect(IsAgent(Calculator)).toBeFalse();
      expect(CreateAgent(Calculator)).toBeTruthy();
    });

    it('re-upgrade agent', () => {
      expect(CreateAgent(CreateAgent(Calculator))).toBeTruthy();
    });

    it('get the attribute', () => {
      expect(Reflector(Calculator).property('RoundOnField').getOwnAttributes(RoundInterceptor).length).toBe(1);
    });

    it('create agent', () => {
      const Agent = CreateAgent(Calculator);
      const agent = new Agent();
      expect(agent).toBeTruthy();
      expect(agent.RoundOnField).toBeNaN();
      agent.RoundOnField = 1.52412423;
      expect(agent.RoundOnField).toBe(2);
      agent.RoundOnField = 4.54354;
      expect(agent.RoundOnField).toBe(5);
      agent.RoundOnField = 7.3455;
      expect(agent.RoundOnField).toBe(7);
      agent.RoundOnField = 4.64354;
      expect(agent.RoundOnField).toBe(5);
    });

    it('create agent with field value', () => {
      const Agent = CreateAgent(Foo);
      const agent = new Agent();

      Reflect.defineProperty(Foo.prototype, 'bar', {
        value: 3.33333,
      });

      expect(agent).toBeTruthy();
      expect(agent.bar).toBeNaN();
      agent.bar = 1.52412423;
      expect(agent.bar).toBe(2);
    });
  });

  describe('# should not able to', () => {
    it('create agent with field value', () => {
      Reflect.defineProperty(Bar.prototype, 'foo', {
        value: 3.33333,
      });

      const Agent = CreateAgent(Bar);

      const a = new Agent();
      a.foo = 10.5;
      // console.log('Re1', Reflect.getOwnPropertyDescriptor(Reflect.getPrototypeOf(a)!, 'foo')!.set!.toString());
      a.foo = 9.5;
      // console.log('Re2', Reflect.getOwnPropertyDescriptor(Reflect.getPrototypeOf(a)!, 'foo')!.set!.toString());
      expect(a.foo).toBe(10);
      a.foo = 9.5;
      a.foo = 8.5;
      a.foo = 7.5;
      expect(a.foo).toBe(8);
    });
  });
});
