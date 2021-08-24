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
import { Attribute } from '../Interfaces/Attribute';
import { Wisdom } from '../Wisdom/Wisdom';
import { FindProperty, FindParameter } from '../Wisdom/Annotator';
import { CONSTRUCTOR } from '../WellKnown';

/**
 * Reflector(target).addAttribute(attribute);
 */
export function AddAttributeToClass(attribute: Attribute, target: object | Function): void {
  AddAttributeToMember(attribute, target, CONSTRUCTOR);
}

/**
 * Reflector(target).parameter(parameterIndex).addAttribute(attribute);
 */
export function AddAttributeToConstructorParameter(
  attribute: Attribute,
  target: object | Function,
  parameterIndex: number
): void {
  AddAttributeToMethodParameter(attribute, target, CONSTRUCTOR, parameterIndex);
}

/**
 * Reflector(target).property(targetKey).parameter(descriptor).addAttribute(attribute);
 */
export function AddAttributeToMethodParameter(
  attribute: Attribute,
  target: object | Function,
  key: string | symbol,
  parameterIndex: number
): void {
  const soul = Wisdom.add(target);
  const property = FindProperty(soul, target, key);
  const parameter = FindParameter(property, parameterIndex);
  parameter.attributes.push(attribute);
}

/**
 * Reflector(target).property(property, descriptor).addAttribute(attribute);
 */
export function AddAttributeToMember(
  attribute: Attribute,
  target: object | Function,
  key: string | symbol,
  descriptor?: PropertyDescriptor
): void {
  // console.log();
  // console.log('target', typeof target, target);
  const soul = Wisdom.add(target);
  const property = FindProperty(soul, target, key, descriptor);
  property.attributes.push(attribute);
}
