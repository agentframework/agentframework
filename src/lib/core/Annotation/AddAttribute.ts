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

import { Annotator } from './Annotator';
import { Attribute } from '../Interfaces/Attribute';

/**
 * Reflector(target).addAttribute(attribute);
 */
export function AddAttributeToClass(attribute: Attribute, type: Function): void {
  const key = 'constructor';
  const typeAnnotation = Annotator.type(type);
  const ctor = Annotator.property(typeAnnotation, type, key);
  Annotator.addAttribute(ctor, attribute);
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
  const typeAnnotation = Annotator.type(type);
  const annotation = Annotator.property(typeAnnotation, type, key);
  const parameter = Annotator.parameter(annotation, type, key, parameterIndex);
  Annotator.addAttribute(parameter, attribute);
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
  const typeAnnotation = Annotator.type(type);
  const annotation = Annotator.property(typeAnnotation, type, property);
  const parameter = Annotator.parameter(annotation, type, property, parameterIndex);
  Annotator.addAttribute(parameter, attribute);
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
  const typeAnnotation = Annotator.type(type);
  const annotation = Annotator.property(typeAnnotation, type, key, descriptor);
  Annotator.addAttribute(annotation, attribute);
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
