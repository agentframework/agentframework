// /* tslint:disable */
import {
  agent,
  CreateAgent,
  decorateMember, GetAgentType,
  IsAgent
} from '../../../src/dependencies/agent';
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

@agent()
class MySQL extends Database {
  run(cmd: any) {
    return 3.1;
  }
}


describe('Compiler', () => {
  describe('# should able to', () => {
    it('create from plain class', () => {
      expect(IsAgent(MongoDB)).toBeFalse();
      expect(GetAgentType(MongoDB)).toBeUndefined()
      const MongoDB$ = CreateAgent(MongoDB);
      expect(IsAgent(MongoDB$)).toBeTrue();
      expect(GetAgentType(MongoDB$)).toBe(MongoDB)

      const db = new MongoDB$();
      expect(db).toBeInstanceOf(MongoDB);
      expect(db).toBeInstanceOf(MongoDB$);
      expect(Reflect.getPrototypeOf(db)).toBe(MongoDB$.prototype);
      expect(Reflect.getPrototypeOf(Reflect.getPrototypeOf(MongoDB$.prototype)!)).toBe(MongoDB.prototype);
    });

    it('create from agent', () => {
      expect(IsAgent(MySQL)).toBeTrue();
      const $MySQL = GetAgentType(MySQL);
      expect($MySQL).toBeInstanceOf(Function);
      expect($MySQL).not.toBe(MySQL);
      const MySQL$ = CreateAgent(MySQL);
      expect(IsAgent(MySQL$)).toBeTrue();
      expect(IsAgent(MySQL)).toBeTrue();
      expect(IsAgent(GetAgentType(MySQL) || MySQL)).toBeFalse();
      const db = new MySQL$();
      expect(db).not.toBeInstanceOf(MySQL);
      expect(db).toBeInstanceOf(MySQL$);
    });
  });
});
