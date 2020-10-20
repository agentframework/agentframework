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
import { Wisdom, PropertyAnnotation } from '../Wisdom';
import { GetParameterAnnotation } from './Annotator';

/**
 * Reflector(target).addAttribute(attribute);
 */
export function AddAttributeToClass(attribute: Attribute, type: Function): void {
  const key = 'constructor';
  const typeAnnotation = Wisdom.getOrCreate(type);
  const ctor = PropertyAnnotation.get(typeAnnotation, type, key);
  ctor.attributes.push(attribute);
}

/**
 * Reflector(target).parameter(parameterIndex).addAttribute(attribute);
 */
export function AddAttributeToClassConstructorParameter(
  attribute: Attribute,
  type: Function,
  parameterIndex: number
): void {
  const key = 'constructor';
  const typeAnnotation = Wisdom.getOrCreate(type);
  const annotation = PropertyAnnotation.get(typeAnnotation, type, key);
  const parameter = GetParameterAnnotation(annotation, type, key, parameterIndex);
  parameter.attributes.push(attribute);
}

/**
 * Reflector(target).property(targetKey).parameter(descriptor).addAttribute(attribute);
 */
export function AddAttributeToClassMethodParameter(
  attribute: Attribute,
  type: Function,
  property: string | symbol,
  parameterIndex: number
): void {
  const typeAnnotation = Wisdom.getOrCreate(type);
  const annotation = PropertyAnnotation.get(typeAnnotation, type, property);
  const parameter = GetParameterAnnotation(annotation, type, property, parameterIndex);
  parameter.attributes.push(attribute);
}

/**
 * Reflector(target).property(property, descriptor).addAttribute(attribute);
 */
export function AddAttributeToClassMember(
  attribute: Attribute,
  type: Function,
  key: string | symbol,
  descriptor?: PropertyDescriptor
): void {
  const typeAnnotation = Wisdom.getOrCreate(type);
  const annotation = PropertyAnnotation.get(typeAnnotation, type, key, descriptor);
  annotation.attributes.push(attribute);
}

// /**
//  * Reflector(target).property(property).addAttribute(attribute);
//  */
// export function AddAttributeToClassField(attribute: Attribute, type: Function, key: string | symbol): void {
//   const typeAnnotation = Annotator.type(type);
//   const annotation = Annotator.property(typeAnnotation, type, key);
//   const value = Annotator.value(annotation);
//   Annotator.addAttribute(value, attribute);
// }

// /**
//  * Reflector(target).property(property, descriptor).addAttribute(attribute);
//  */
// export function AddAttributeToClassMethod(
//   attribute: Attribute,
//   type: Function,
//   key: string | symbol,
//   descriptor?: PropertyDescriptor
// ): void {
//   const typeAnnotation = Annotator.type(type);
//   const annotation = Annotator.property(typeAnnotation, type, key, descriptor);
//   const value = Annotator.value(annotation);
//   Annotator.addAttribute(value, attribute);
// }

// /**
//  * Reflector(target).property(property, descriptor).addAttribute(attribute);
//  */
// export function AddAttributeToClassGetter(
//   attribute: Attribute,
//   type: Function,
//   key: string | symbol,
//   descriptor?: PropertyDescriptor
// ): void {
//   const typeAnnotation = Annotator.type(type);
//   const annotation = Annotator.property(typeAnnotation, type, key, descriptor);
//   const getter = Annotator.getter(annotation);
//   Annotator.addAttribute(getter, attribute);
// }

// /**
//  * Reflector(target).property(property, descriptor).addAttribute(attribute);
//  */
// export function AddAttributeToClassSetter(
//   attribute: Attribute,
//   type: Function,
//   key: string | symbol,
//   descriptor?: PropertyDescriptor
// ): void {
//   const typeAnnotation = Annotator.type(type);
//   const annotation = Annotator.property(typeAnnotation, type, key, descriptor);
//   const setter = Annotator.setter(annotation);
//   Annotator.addAttribute(setter, attribute);
// }
