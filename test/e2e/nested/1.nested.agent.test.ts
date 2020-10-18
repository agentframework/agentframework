/* tslint:disable */
import { CreateAgent, agent, decorateClass, decorateClassProperty, IsAgent } from '../../../lib';
import { AgentChecker } from '../attributes/AgentChecker';
import { RandomInterceptor } from '../attributes/RandomInterceptor';
import { RoundInterceptor } from '../attributes/RoundInterceptor';
import { MetadataAttribute } from '../attributes/MetadataAttribute';

@agent()
@decorateClass(new AgentChecker())
class Veicle {
  mileage!: number;

  @decorateClassProperty(new RandomInterceptor())
  random!: Date;

  @decorateClassProperty(new RandomInterceptor())
  @decorateClassProperty(new RoundInterceptor())
  both: any;

  @decorateClassProperty(new MetadataAttribute())
  metadata: any;

  light(name: string): void {
    console.log('turn on', name);
  }

  @decorateClassProperty(new RoundInterceptor())
  round(): any {}
}

class Car extends Veicle {
  @decorateClassProperty(new RandomInterceptor())
  random2!: Date;

  start() {
    console.log('start');
  }
}

// z
//     // const f1 = 'f1';
//     // const o1 = { f1 };
//     // Object.setPrototypeOf(o1, A1.prototype);
//     // return Reflect.construct(A.prototype.constructor, [], A1);
//   }
//   class A {
// }
//
// class B extends A1 {
//   f2: string;
//   constructor() {
//     super();
//     this.f2 = 'f2';
//   }
// }
//
// class B1 extends B {
//   constructor() {
//     const prev = super();
//
//     return prev;
//     // const prev = super()
//     // return Reflect.construct(B.prototype.constructor, arguments, prev);
//
//     // return Reflect.construct(B.prototype.constructor, [], B1);
//   }
// }

describe('Nested Agent', () => {
  describe('# should able to', () => {
    it('create nested agent', () => {
      const car = new Car();
      expect(car).toBeTruthy();
    });

    it('get super field', () => {
      const car = new Car();
      expect(typeof car.random).toBe('number');
    });

    it('decorate agent twice', () => {
      const NewCar = CreateAgent(Car);
      expect(IsAgent(NewCar)).toBeTruthy();
    });

    it('get agent local field', () => {
      const NewCar = CreateAgent(Car);
      const car = new NewCar();
      expect(typeof car.random2).toBe('number');
    });
  });

  describe('# should not able to', () => {
    it('get local field', () => {
      const car = new Car();
      expect(typeof car.random2).toBe('undefined');
    });
  });
});
