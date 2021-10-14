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

import { CONSTRUCTOR } from './WellKnown';
import { FindProperty } from '../Core/FindProperty';
import { FindParameter } from '../Core/FindParameter';
import { Wisdom } from '../Core/Wisdom';

/**
 * equals Reflector(target).addAttribute(attribute);
 */
export function AddAttributeToClass(attribute: object, target: object | Function): void {
  AddAttributeToProperty(attribute, target, CONSTRUCTOR);
}

/**
 * equals Reflector(target).parameter(parameterIndex).addAttribute(attribute);
 */
export function AddAttributeToClassConstructorParameter(
  attribute: object,
  target: object | Function,
  parameterIndex: number
): void {
  AddAttributeToPropertyParameter(attribute, target, CONSTRUCTOR, parameterIndex);
}

/**
 * equals Reflector(target).property(property, descriptor).addAttribute(attribute);
 */
export function AddAttributeToProperty(
  attribute: object,
  target: object | Function,
  key: string | symbol,
  descriptor?: PropertyDescriptor
): void {
  // console.log();
  // console.log('target', typeof target, target);
  const knowledge = Wisdom.add(target);
  const annotation = FindProperty(knowledge, target, key, descriptor);
  annotation.attributes.push(attribute);
}

/**
 * equals Reflector(target).property(targetKey).parameter(descriptor).addAttribute(attribute);
 */
export function AddAttributeToPropertyParameter(
  attribute: object,
  target: object | Function,
  key: string | symbol,
  parameterIndex: number
): void {
  const knowledge = Wisdom.add(target);
  const property = FindProperty(knowledge, target, key);
  const annotation = FindParameter(property, parameterIndex);
  annotation.attributes.push(attribute);
}
