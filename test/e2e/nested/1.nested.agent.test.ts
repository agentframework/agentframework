/* tslint:disable */
import { Agent, agent, decorateClass, decorateClassMember, IsAgent } from '../../../src/lib';
import { AgentChecker } from '../attributes/AgentChecker';
import { RandomAttribute } from '../attributes/RandomAttribute';
import { RoundAttribute } from '../attributes/RoundAttribute';
import { MetadataAttribute } from '../attributes/MetadataAttribute';

@agent()
@decorateClass(new AgentChecker())
class Veicle {
  mileage: number;

  @decorateClassMember(new RandomAttribute())
  random: Date;

  @decorateClassMember(new RandomAttribute())
  @decorateClassMember(new RoundAttribute())
  both: any;

  @decorateClassMember(new MetadataAttribute())
  metadata: any;

  light(name: string): void {
    console.log('turn on', name);
  }

  @decorateClassMember(new RoundAttribute())
  round(): any { }
}

class Car extends Veicle {
  @decorateClassMember(new RandomAttribute())
  random2: Date;

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
      const NewCar = Agent(Car);
      expect(IsAgent(NewCar)).toBeTruthy();
    });
  });

  describe('# should not able to', () => {
    it('get agent local field', () => {
      const NewCar = Agent(Car);
      const car = new NewCar();
      expect(typeof car.random2).toBe('undefined');
    });

    it('get local field', () => {
      const car = new Car();
      expect(typeof car.random2).toBe('undefined');
    });
  });
});
