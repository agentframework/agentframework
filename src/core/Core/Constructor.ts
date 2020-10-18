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

export interface AbstractConstructor<T> extends Function {
  readonly prototype: T;
}

export interface DefaultConstructor<T> extends AbstractConstructor<T> {
  new (): T;
}

export interface ParameterConstructor<T> extends AbstractConstructor<T> {
  new (...params: any[]): T;
}

export type Constructor<T> = DefaultConstructor<T> | ParameterConstructor<T>;

export type AnyConstructor<T> = Constructor<T> | AbstractConstructor<T>;
