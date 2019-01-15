
import {
  Agent,
  decorateAgent,
  decorateClassField,
  IInterceptor,
  AgentAttribute,
  IAttribute
} from '../../../src/lib';
import { InjectAttribute } from '../attributes/InjectAttribute';
import { AgentTrackerAttribute } from '../attributes/AgentTrackerAttribute';

class Connection {
  constructor() {
    Connection.count++;
  }
  static count = 0;
  state = 'offline';
}

class Database {
  @decorateClassField(new InjectAttribute())
  connection: Connection;
}

@decorateAgent(new AgentTrackerAttribute())
class MongoDB extends Database {
  run(cmd: any) {
    return 8.5;
  }
}

class AgentBadInterceptorAttribute extends AgentAttribute implements IAttribute {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return true;
  }

  public get interceptor(): IInterceptor {
    return <any>1;
  }
}

describe('Compiler got Bad AgentAttribute', () => {
  describe('# should able to', () => {

    it('ignore bad agent', () => {
      const MongoDB$ = Agent(MongoDB, new AgentBadInterceptorAttribute());
      const m = new MongoDB$();
      expect(m instanceof MongoDB).toBe(true);
      expect(m instanceof MongoDB$).toBe(true);
      expect(Reflect.getPrototypeOf(m)).toBe(MongoDB$.prototype);
      expect(MongoDB$).toBe(MongoDB);
    });

  });

});
