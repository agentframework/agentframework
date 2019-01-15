import 'jasmine';
import {
  agent,
  Agent,
  decorateClassField,
  decorateClassMethod,
  decorateParameter,
  IAttribute,
  IInterceptor,
  IInvocation,
  IsAgent,
  decorateClassMember
} from '../../../src/lib';
import { InjectAttribute } from '../attributes/InjectAttribute';

class Connection {
  constructor() {
    // console.log('Connection(', arguments, ')');
    expect(arguments.length).toBe(1);
    expect(arguments[0]).toBe('test');
    Connection.count++;
  }
  static count = 0;
  state = 'offline';
}

class Database {}

class TypeChecker implements IAttribute, IInterceptor {
  get interceptor(): IInterceptor {
    return this;
  }

  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return true;
  }

  public intercept(target: IInvocation, parameters: ArrayLike<any>): any {
    expect(typeof target.target).toBe('function');
    return target.invoke(parameters);
  }
}

class TypeFormatter implements IAttribute, IInterceptor {
  get interceptor(): IInterceptor {
    return this;
  }

  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return true;
  }

  public intercept(target: IInvocation, parameters: ArrayLike<any>): any {
    expect(typeof target.target).toBe('function');
    return target.invoke(Array.prototype.slice.call(parameters, 0));
  }
}

@agent()
class MongoDB {
  @decorateClassField(new InjectAttribute())
  connection: Connection;

  @decorateClassMethod(new TypeChecker())
  test11(@decorateParameter(new InjectAttribute()) db?: Database) {
    expect(arguments.length).toBe(1);
    expect(db).toBeTruthy();
    expect(db instanceof Database).toBeTruthy();
    return db;
  }

  @decorateClassMember(new TypeChecker())
  test12(@decorateParameter(new InjectAttribute()) db?: Database) {
    expect(arguments.length).toBe(1);
    expect(db).toBeTruthy();
    expect(db instanceof Database).toBeTruthy();
    return db;
  }

  @decorateClassMember(new TypeFormatter())
  @decorateClassMethod(new TypeChecker())
  test21(@decorateParameter(new InjectAttribute()) db?: Database) {
    expect(arguments.length).toBe(1);
    expect(db).toBeTruthy();
    expect(db instanceof Database).toBeTruthy();
    return db;
  }

  @decorateClassMethod(new TypeFormatter())
  @decorateClassMember(new TypeChecker())
  test22(@decorateParameter(new InjectAttribute()) db?: Database) {
    expect(arguments.length).toBe(1);
    expect(db).toBeTruthy();
    expect(db instanceof Database).toBeTruthy();
    return db;
  }

  user: string;
  constructor(user: string) {
    // console.log('MongoDB(', arguments, ')');
    expect(arguments.length).toBe(1);
    expect(arguments[0]).toBe('test');
    this.user = user;
  }
}

describe('Initializer for Method Parameter', () => {
  describe('# should able to', () => {
    it('upgrade class', () => {
      expect(IsAgent(MongoDB)).toBe(true);
    });

    it('re-upgrade class', () => {
      expect(Agent(MongoDB)).toBe(MongoDB);
    });

    it('create with injected connection', () => {
      expect(Connection.count).toBe(0);
      const db = new MongoDB('test');
      expect(db).toBeTruthy();
      expect(db.user).toBe('test');
      expect(db.connection).toBeTruthy();
      expect(db.connection instanceof Connection).toBeTruthy();
      expect(Connection.count).toBe(1);
    });

    it('call method with inspector and param initializer', () => {
      const db = new MongoDB('test');
      expect(db.test11()).toBeTruthy();
    });

    it('call method with inspector and param initializer', () => {
      const db = new MongoDB('test');
      expect(db.test12()).toBeTruthy();
    });

    it('call method with 2 inspectors and param initializer', () => {
      const db = new MongoDB('test');
      expect(db.test21()).toBeTruthy();
    });

    it('call method with 2 inspectors and param initializer', () => {
      const db = new MongoDB('test');
      expect(db.test22()).toBeTruthy();
    });
  });
});
