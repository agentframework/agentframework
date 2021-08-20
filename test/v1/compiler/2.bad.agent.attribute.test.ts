/* tslint:disable */

import { decorateMember, Interceptor, Attribute } from '../../../src';
import { CreateAgentClass, AgentAttribute } from '../../../src';
import { InjectAttribute } from '../attributes/InjectAttribute';

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

class AgentBadInterceptorAttribute extends AgentAttribute implements Attribute {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return true;
  }

  public get interceptor(): Interceptor {
    return 1 as any;
  }
}

describe('Compiler got Bad AgentAttribute', () => {
  describe('# should able to', () => {
    it('ignore bad agent', () => {
      const MongoDB$ = CreateAgentClass(MongoDB, new AgentBadInterceptorAttribute());
      const m = new MongoDB$();
      expect(m instanceof MongoDB).toBe(true);
      expect(m instanceof MongoDB$).toBe(true);
      expect(Reflect.getPrototypeOf(m)).toBe(MongoDB$.prototype);
      expect(MongoDB$).toBe(MongoDB);
    });
  });
});
