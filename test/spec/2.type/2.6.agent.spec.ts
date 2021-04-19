import {
  agent,
  Arguments,
  decorate,
  ParameterAttribute,
  ParameterInterceptor,
  ParameterInvocation,
} from '../../../lib';

class InjectAttribute implements ParameterAttribute, ParameterInterceptor {
  constructor(readonly type?: any) {}
  get interceptor() {
    return this;
  }
  intercept(target: ParameterInvocation, params: Arguments, receiver: any): any {
    return target.invoke(params, receiver);
  }
}

function inject(type?: any) {
  return decorate(new InjectAttribute(type));
}

class Data {}
describe('2.6. Agent', () => {
  describe('# should able to', () => {
    it('upgrade type to agent', () => {
      @agent()
      class Agent261 {}
      expect(Agent261).toBeDefined();
    });

    it('upgrade type with constructor parameter', () => {
      @agent()
      class Agent262 {
        constructor(@inject(Data) data1: any, @inject() data2: Data) {}
      }
      expect(Agent262).toBeDefined();
    });

    it('upgrade type with member', () => {
      @agent()
      class Agent263 {
        @inject(Data)
        data1: any;

        @inject()
        data2!: Data;

        @inject(Data)
        data3() {}
      }
      expect(Agent263).toBeDefined();
    });

    it('upgrade type with member parameter', () => {
      @agent()
      class Agent264 {
        @inject(Data)
        data1: any;

        @inject()
        data2!: Data;

        @inject(Data)
        data3(@inject(Data) data: any) {}

        @inject(Data)
        data4(@inject() data: Data) {}

        @inject(Data)
        data5(@inject() data1: Data, @inject(Data) data2: any) {}
      }
      expect(Agent264).toBeDefined();
    });
  });

  describe('# should not able to', () => {
    it('upgrade type to agent twice', () => {
      @agent()
      @agent()
      class Agent265 {}

      expect(Agent265).toBeDefined();
    });
  });
});
