/* tslint:disable */
import { agent, decorateClass, decorateMember, IsAgent } from '../../../../release';
import { AgentChecker } from '../1.attributes/AgentChecker';
import { RandomInterceptor } from '../1.attributes/RandomInterceptor';
import { RoundInterceptor } from '../1.attributes/RoundInterceptor';
import { MetadataAttribute } from '../1.attributes/MetadataAttribute';
import { CreateAgent } from '../../../../release';

@agent()
@decorateClass(new AgentChecker())
class Veicle {
  mileage!: number;

  @decorateMember(new RandomInterceptor())
  random!: Date;

  @decorateMember(new RandomInterceptor())
  @decorateMember(new RoundInterceptor())
  both: any;

  @decorateMember(new MetadataAttribute())
  metadata: any;

  light(name: string): void {
    // console.log('turn on', name);
  }

  @decorateMember(new RoundInterceptor())
  round(): any {}
}

class Car extends Veicle {
  @decorateMember(new RandomInterceptor())
  random2!: Date;

  start() {
    // console.log('start');
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
