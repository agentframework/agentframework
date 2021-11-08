/* tslint:disable */
import { decorateMember, agent, IsAgent, Interceptor, TypeInvocation, Arguments } from '../../dependencies/agent';
import { CreateAgent } from './CreateAgent';
import { TransitAttribute } from './Decorators/DependencyInjection/TransitAttribute';

class Connection {
  static count = 0;
  state = 'offline';
  constructor() {
    Connection.count++;
  }
}

class Database {
  @decorateMember(new TransitAttribute())
  connection!: Connection;
}

class MongoDB extends Database {
  run(cmd: any) {
    return 8.5;
  }
}

@agent()
class MySQLAgent extends Database {
  run(cmd: any) {
    return 3.1;
  }
}

class Redis extends Database {
  run(cmd: any) {
    return 1.9;
  }
}

const NoNameRedis = (function () {
  return class {};
})();

class CustomAgentAttribute implements Interceptor {
  get interceptor(): Interceptor {
    return this;
  }
  intercept(target: TypeInvocation, parameters: Arguments, receiver: any): any {
    return target.invoke<Function>(parameters, receiver);
  }
}

describe('Compiler', () => {
  describe('# should able to', () => {
    it('create using factory', () => {
      const MongoDB$ = CreateAgent(MongoDB);
      const db = new MongoDB$();
      expect(MongoDB$.prototype).toBeInstanceOf(MongoDB);
      expect(db).toBeInstanceOf(MongoDB);
      expect(db).toBeInstanceOf(MongoDB$);
      expect(Reflect.getPrototypeOf(db)).toBe(MongoDB$.prototype);
    });

    it('create using custom factory', () => {
      const MongoDB$ = CreateAgent(MongoDB, new CustomAgentAttribute());
      expect(IsAgent(MongoDB$)).toBeTrue();
      const db = new MongoDB$();
      expect(db).toBeInstanceOf(MongoDB);
      expect(db).toBeInstanceOf(MongoDB$);
    });

    it('create using decorator', () => {
      const MySQL$ = CreateAgent(MySQLAgent);
      expect(IsAgent(MySQL$)).toBeTrue();
      const db = new MySQL$();
      expect(db).not.toBeInstanceOf(MySQLAgent); // MySQLAgent here is another agent
      expect(db).toBeInstanceOf(MySQL$);
    });

    it('create using custom decorator', () => {
      const Redis$ = CreateAgent(Redis, new CustomAgentAttribute());
      const db = new Redis$();
      expect(IsAgent(db)).toBeFalse();
      expect(IsAgent(Reflect.getPrototypeOf(db)!)).toBeTrue();
      expect(IsAgent(Redis$)).toBeTrue();
      expect(IsAgent(Reflect.getPrototypeOf(Redis$)!)).toBeFalse();
      expect(db).toBeInstanceOf(Redis);
      expect(db).toBeInstanceOf(Redis$);
      expect(Redis$.prototype).toBeInstanceOf(Redis);
    });

    it('new create agent without name', () => {
      const RedisAgent = CreateAgent(NoNameRedis);
      const redis$ = new RedisAgent();
      expect(redis$).toBeInstanceOf(RedisAgent);
      expect(redis$).toBeInstanceOf(NoNameRedis);
      expect(RedisAgent.prototype).toBeInstanceOf(NoNameRedis);
    });
  });

  describe('# should no able to', () => {});
});
