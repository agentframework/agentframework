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

import { Attribute } from './Attribute';
import { FindParameter } from './FindParameter';
import { CONSTRUCTOR } from '../WellKnown';
import { FindSoul } from './FindSoul';
import { FindProperty } from './FindProperty';

/**
 * equals Reflector(target).addAttribute(attribute);
 */
export function AddAttributeToClass(attribute: Attribute, target: object | Function): void {
  AddAttributeToProperty(attribute, target, CONSTRUCTOR);
}

/**
 * equals Reflector(target).parameter(parameterIndex).addAttribute(attribute);
 */
export function AddAttributeToClassConstructorParameter(
  attribute: Attribute,
  target: object | Function,
  parameterIndex: number
): void {
  AddAttributeToPropertyParameter(attribute, target, CONSTRUCTOR, parameterIndex);
}

/**
 * equals Reflector(target).property(property, descriptor).addAttribute(attribute);
 */
export function AddAttributeToProperty(
  attribute: Attribute,
  target: object | Function,
  key: string | symbol,
  descriptor?: PropertyDescriptor
): void {
  // console.log();
  // console.log('target', typeof target, target);
  const soul = FindSoul(target);
  const property = FindProperty(soul, target, key, descriptor);
  property.attributes.push(attribute);
}

/**
 * equals Reflector(target).property(targetKey).parameter(descriptor).addAttribute(attribute);
 */
export function AddAttributeToPropertyParameter(
  attribute: Attribute,
  target: object | Function,
  key: string | symbol,
  parameterIndex: number
): void {
  const soul = FindSoul(target);
  const property = FindProperty(soul, target, key);
  const parameter = FindParameter(property, parameterIndex);
  parameter.attributes.push(attribute);
}
