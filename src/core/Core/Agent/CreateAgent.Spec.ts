/* tslint:disable */
import {
  decorateMember,
  agent,
  IsAgent,
  GetAgentType,
  InjectAttribute,
  Interceptor,
  ClassInvocation,
  Arguments,
} from '../../../';
import { CreateAgent } from './CreateAgent';

class Connection {
  static count = 0;
  state = 'offline';
  constructor() {
    Connection.count++;
  }
}

class Database {
  @decorateMember(new InjectAttribute())
  connection!: Connection;
}

class MongoDB extends Database {
  run(cmd: any) {
    return 8.5;
  }
}

@agent()
class MySQL extends Database {
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
  intercept(target: ClassInvocation, parameters: Arguments, receiver: any): any {
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
      expect(Reflect.getPrototypeOf(MongoDB$.prototype)).toBe(MongoDB.prototype);
    });

    it('create using custom factory', () => {
      const MongoDB$ = CreateAgent(MongoDB, new CustomAgentAttribute());
      expect(IsAgent(MongoDB$)).toBeFalse();
      const db = new MongoDB$();
      expect(db).toBeInstanceOf(MongoDB);
      expect(db).toBeInstanceOf(MongoDB$);
    });

    it('create using decorator', () => {
      const MySQL$ = CreateAgent(MySQL);
      expect(IsAgent(MySQL$)).toBeTrue();
      expect(IsAgent(MySQL$, MySQL)).toBeFalse();
      expect(IsAgent(MySQL$, GetAgentType(MySQL))).toBeTrue();
      const db = new MySQL$();
      expect(db).not.toBeInstanceOf(MySQL);
      expect(db).toBeInstanceOf(MySQL$);
    });

    it('create using custom decorator', () => {
      const Redis$ = CreateAgent(Redis, new CustomAgentAttribute());
      const db = new Redis$();
      expect(IsAgent(db)).toBeFalse();
      expect(Redis$).toBe(Redis);
      expect(db).toBeInstanceOf(Redis);
      expect(db).toBeInstanceOf(Redis$);
      expect(Redis$.prototype).toBe(Redis.prototype);
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
