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

import { Annotation, ParameterAnnotation, PropertyAnnotation, MemberAnnotation } from './Annotation';
import { Wisdom } from '../Wisdom';
import { Attribute } from '../Interfaces/Attribute';

export class Annotator {
  /**
   * get metadata for type
   */
  static type(type: Function): Annotation {
    const originType = Wisdom.GetType(type) || type;
    const exists = Wisdom.GetAnnotation(originType);
    if (exists) {
      return exists;
    }
    // check parent and build object prototype chain
    const prototype = Reflect.getPrototypeOf(originType.prototype);
    const annotations = Object.create(prototype && Annotator.type(prototype.constructor));
    return Wisdom.RememberAnnotation(originType, annotations);
  }

  /**
   * get metadata for type property
   */
  static property(
    annotation: Annotation,
    type: Function,
    key: string | symbol,
    descriptor?: PropertyDescriptor
  ): PropertyAnnotation {
    const annotationProperty = Reflect.getOwnPropertyDescriptor(annotation, key);
    let value: PropertyAnnotation;
    if (annotationProperty) {
      value = annotationProperty.value;
      // just in case decorate parameter first and decorate property second
      // if (descriptor && !value.descriptor) {
      //   console.log('d', value);
      //   value.descriptor = descriptor;
      // }
    } else {
      value = new PropertyAnnotation(type, descriptor);
      // make sure this meta is readonly and unable to delete
      Reflect.defineProperty(annotation, key, {
        value,
        enumerable: true
      });
    }
    return value;
  }

  // static value(property: PropertyAnnotation): MemberAnnotation {
  //   return property.value || (property.value = new MemberAnnotation());
  // }
  //
  // static getter(property: PropertyAnnotation): MemberAnnotation {
  //   return property.getter || (property.getter = new MemberAnnotation());
  // }
  //
  // static setter(property: PropertyAnnotation): MemberAnnotation {
  //   return property.setter || (property.setter = new MemberAnnotation());
  // }

  static parameter(
    annotation: PropertyAnnotation,
    target: Function,
    property: PropertyKey,
    index: number
  ): ParameterAnnotation {
    const map = annotation.parameters || (annotation.parameters = new Map<number, ParameterAnnotation>());
    if (map.has(index)) {
      return map.get(index)!;
    } else {
      const parameter = new ParameterAnnotation(index);
      map.set(index, parameter);
      return parameter;
    }
  }

  static addAttribute(annotation: MemberAnnotation, attribute: Attribute): void {
    // console.log(n++);
    annotation.attributes.push(attribute);
  }

  static addMetadata(annotation: MemberAnnotation, key: string, value: any): void {
    // if (metadata.has(key)) {
    //   throw new Error(`Duplicate metadata key '${key}'`);
    // }
    // console.log('[metadata]', annotation, '    add    ', key, '=', value);
    annotation.set(key, value);
  }
}
