/* Copyright 2016 Ling Zhang

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

import { Invocation } from './Interfaces/Invocation';

export class AgentFrameworkMetadata {
  // key: Proxy | Agent Constructor | Domain Agent Constructor, value: Original Constructor
  private readonly _types = new WeakMap<Function, Function>();

  // key: class, prototype; value: annotation
  private readonly _annotations = new WeakMap<Function, any>();

  // key: class prototype; value: Reflector type
  private readonly _infos = new WeakMap<Function, Function>();

  // key: function; value: Invocation
  private readonly _functionInvocations = new WeakMap<Function, Invocation>();

  // key: any; value: any
  private readonly _registry = new Map<string, any>();

  // key: string; value: symbol
  // private readonly _symbols = new Map<string, symbol>();

  /**
   * Returns true if the type is an agent
   */
  IsAgent<T extends Function>(test: T): boolean {
    return this._types.has(test);
  }

  /**
   * Returns original type of the agent
   */
  GetType<T extends Function>(agent: T): T | undefined {
    return this._types.get(agent) as T;
  }

  /**
   * Remember the relationship between type and agent
   */
  RememberType(agent: Function, type: Function): void {
    this._types.set(agent, type);
  }

  // NOT WORKING BECAUSE PROXY !== ORIGIN FUNCTION
  // AddType(agent: Function, origin: Function): void {
  //   let top = agent;
  //   console.log('agent', agent);
  //   console.log('origin', origin);
  //   while (top && top !== origin) {
  //     console.log('prototype', top, origin, top === origin);
  //     this.SetType(top, origin);
  //     top = Object.getPrototypeOf(top);
  //   }
  // }

  GetAnnotation(type: Function): any {
    return this._annotations.get(type);
  }

  RememberAnnotation(type: Function, annotation: any): any {
    this._annotations.set(type, annotation);
    return annotation;
  }

  GetTypeInfo(type: Function): any {
    return this._infos.get(type);
  }

  RememberTypeInfo(type: Function, info: any) {
    this._infos.set(type, info);
  }

  GetFunctionInvocation(type: Function): Invocation | undefined {
    return this._functionInvocations.get(type);
  }

  SetFunctionInvocation(type: Function, invocation: Invocation) {
    this._functionInvocations.set(type, invocation);
  }

  GetOrCreate<T>(id: string, handler: () => T): T {
    let found = this._registry.get(id);
    /* istanbul ignore else */
    if (!found) {
      found = handler();
      this._registry.set(id, found);
    }
    return found;
  }

  // GetOrCreateSymbol(id: string): symbol {
  //   let found = this._symbols.get(id);
  //   if (!found) {
  //     found = Symbol(id);
  //     this._symbols.set(id, found);
  //   }
  //   return found;
  // }
}

class AgentFrameworkMetadataHandler {}

const Create: <T>(id: string, handler: () => T) => T = new Function(
  'k',
  'v',
  'return k=Symbol.for(k),this[k]=this[k]||(this[k]=v())'
) as any;

export const Wisdom = Create(
  'AgentFramework',
  () => new Proxy(new AgentFrameworkMetadata(), new AgentFrameworkMetadataHandler())
);

// create metadata for satellites project
export function GetOrCreate<T>(id: string, handler: () => T): T {
  return Wisdom.GetOrCreate<T>(id, handler);
}

//
// export function GetOrCreateSymbol(id: string): symbol {
//   return Wisdom.GetOrCreateSymbol(id);
// }
