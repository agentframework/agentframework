/* tslint:disable */

import { decorateMember, Interceptor, Attribute } from '../../../src/dependencies/agent';
import { CreateAgent, AgentAttribute } from '../../../src/dependencies/agent';
import { InjectAttribute } from '../1.attributes/InjectAttribute';

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
  describe('# should not able to', () => {
    it('create agent', () => {
      expect(()=>{
        const MongoDB$ = CreateAgent(MongoDB, new AgentBadInterceptorAttribute());
        const mongo = new MongoDB$();
        expect(mongo).toBeInstanceOf(MongoDB)
      }).toThrowError();
    });
  });
});
