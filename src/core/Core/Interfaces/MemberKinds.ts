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

export enum MemberKinds {
  None = 0,
  Class = 1,
  Property = 2,
  Parameter = 4,
  // Field = 8,
  // Method = 16,
  // Getter = 32,
  // Setter = 64,
  // ConstructorParameter = 128,
  // MethodParameter = 256,
  All = 65535
}
