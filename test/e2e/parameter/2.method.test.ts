/* tslint:disable */

import {
  agent,
  decorateParameter,
  Attribute,
  Interceptor,
  Invocation,
  decorateMember,
  Arguments,
} from '../../../lib';
import { InjectAttribute } from '../attributes/InjectAttribute';

class Connection {
  static count = 0;
  state = 'offline';
  constructor() {
    Connection.count++;
  }
}

class Database {}

class TypeChecker implements Attribute, Interceptor {
  get interceptor(): Interceptor {
    return this;
  }

  intercept(target: Invocation, parameters: Arguments, receiver: any): any {
    return target.invoke(parameters, receiver);
  }
}

class TypeFormatter implements Attribute, Interceptor {
  get interceptor(): Interceptor {
    return this;
  }

  intercept(target: Invocation, parameters: Arguments, receiver: any): any {
    expect(receiver).toBeInstanceOf(Object);
    return target.invoke(Array.prototype.slice.call(parameters, 0), receiver);
  }
}

@agent()
class MongoDB {
  @decorateMember(new InjectAttribute())
  connection!: Connection;

  user: string;
  constructor(user: string) {
    // console.log('MongoDB(', arguments, ')');
    expect(arguments.length).toBe(1);
    expect(arguments[0]).toBe('test');
    this.user = user;
  }

  @decorateMember(new TypeChecker())
  test11(@decorateParameter(new InjectAttribute()) db?: Database) {
    expect(arguments.length).toBe(1);
    expect(db).toBeTruthy();
    expect(db instanceof Database).toBeTruthy();
    return db;
  }

  @decorateMember(new TypeChecker())
  test12(@decorateParameter(new InjectAttribute()) db?: Database) {
    expect(arguments.length).toBe(1);
    expect(db).toBeTruthy();
    expect(db instanceof Database).toBeTruthy();
    return db;
  }

  @decorateMember(new TypeFormatter())
  @decorateMember(new TypeChecker())
  test21(@decorateParameter(new InjectAttribute()) db?: Database) {
    expect(arguments.length).toBe(1);
    expect(db).toBeTruthy();
    expect(db instanceof Database).toBeTruthy();
    return db;
  }

  @decorateMember(new TypeFormatter())
  @decorateMember(new TypeChecker())
  test22(@decorateParameter(new InjectAttribute()) db?: Database) {
    expect(arguments.length).toBe(1);
    expect(db).toBeTruthy();
    expect(db instanceof Database).toBeTruthy();
    return db;
  }
}

describe('Initializer for Method Parameter', () => {
  describe('# should able to', () => {
    it('create with injected connection', () => {
      // expect(Connection.count).toBe(0);
      const db = new MongoDB('test');
      expect(db).toBeTruthy();
      expect(db.user).toBe('test');
      expect(db.connection).toBeTruthy();
      expect(db.connection instanceof Connection).toBeTruthy();

      // console.log();
      // console.log('DB 1', db);
      // console.log('DB 2', Reflect.getPrototypeOf(db));
      // console.log('DB 2', Reflect.getPrototypeOf(Reflect.getPrototypeOf(db)));
      // console.log('DB 2', Reflect.getPrototypeOf(Reflect.getPrototypeOf(Reflect.getPrototypeOf(db))));

      // each db.connection will create a new instance
      expect(Connection.count).toBe(2);
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
