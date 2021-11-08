/* tslint:disable */
import {
  AgentAttribute,
  Arguments,
  CreateAgent,
  decorateMember,
  GetAgentType,
  GetType,
  Invocation,
  IsAgent,
  Reflector,
  agent,
} from '../../../dependencies/agent';

@agent()
class MongoDB {
  public connect(): boolean {
    return true;
  }
}

describe('Core @agent() decorator', () => {
  describe('# should able to', () => {
    it('detect agent', () => {
      expect(IsAgent(MongoDB)).toBe(true);
    });

    it('re-upgrade agent', () => {
      const newAgent = CreateAgent(MongoDB);
      expect(newAgent).not.toBe(MongoDB);
    });

    it('new instance', () => {
      const db = new MongoDB();
      expect(db instanceof MongoDB).toBe(true);
    });

    it('construct instance', () => {
      const db = Reflect.construct(MongoDB, []);
      expect(Reflect.getPrototypeOf(db)).toBe(MongoDB.prototype);
      expect(db instanceof MongoDB).toBe(true);
    });

    it('double agent', () => {
      @agent()
      @agent()
      class DoubleClass {}

      const DoubleAgent = CreateAgent(DoubleClass);
      expect(DoubleClass).not.toBe(DoubleAgent);
      expect(DoubleAgent).not.toBe(DoubleClass);

      const da = new DoubleAgent();
      expect(da).toBeInstanceOf(DoubleAgent);
      expect(da).not.toBeInstanceOf(DoubleClass);

      const dc = new DoubleClass();
      expect(dc).toBeInstanceOf(DoubleClass);
      expect(dc).not.toBeInstanceOf(DoubleAgent);
    });

    it('nest agent', () => {
      class Base {
        @decorateMember({
          interceptor: {
            intercept(target: Invocation, params: Arguments, receiver: unknown): unknown {
              return Math.floor(params[0]);
            },
          },
        })
        static floorBase(num: number) {
          return num;
        }
      }

      @agent()
      class Middle extends Base {
        @decorateMember({
          interceptor: {
            intercept(target: Invocation, params: Arguments, receiver: unknown): unknown {
              return Math.floor(params[0]);
            },
          },
        })
        static floorMiddle(num: number) {
          return num;
        }
      }

      @agent()
      class End extends Middle {
        @decorateMember({
          interceptor: {
            intercept(target: Invocation, params: Arguments, receiver: unknown): unknown {
              return Math.floor(params[0]);
            },
          },
        })
        static floorEnd(num: number) {
          return num;
        }
      }

      const EndAgent = CreateAgent(End);
      expect(EndAgent).not.toBe(End);

      expect(End.floorEnd(3.9)).toBe(3.9);
      expect(End.floorMiddle(6.5)).toBe(6.5);
      expect(End.floorBase(128937.332897)).toBe(128937.332897);

      expect(GetAgentType<Function>(End)).toBe(GetType<Function>(End));
      expect(GetAgentType<Function>(Middle)).toBe(GetType<Function>(Middle));
      expect(GetAgentType<Function>(Base)).toBe(GetType<Function>(Base));

      expect(Reflect.getPrototypeOf(GetType<Function>(End)!)).toBe(Middle);
    });
  });

  describe('# should not able to', () => {
    it('get agent attribute', () => {
      // AgentAttribute is only used in compile agent phase
      // AgentAttribute is not a metadata for agent class
      const items = Reflector(MongoDB).getOwnAttributes(AgentAttribute);
      expect(items.length).toBe(0);
    });
  });
});
