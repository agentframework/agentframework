// import { Constructor } from '../Constructor';
// import { Attribute } from '../Interfaces/Attribute';
// import { TypeInfo } from '../Interfaces/TypeInfo';
//
// export class TypeFilters {
//   /**
//    * Return user types (excludes all proxy types)
//    */
//   static Class(type: TypeInfo) {
//     return type.type !== Object;
//   }
//
//   /**
//    * Return true if type contains giving attribute
//    */
//   static FilterAttribute<T extends Attribute>(type: TypeInfo, filterCriteria?: Constructor<T>): boolean {
//     if (!filterCriteria) {
//       throw new Error('Missing Attribute to filter');
//     }
//     return type.hasOwnAttribute(filterCriteria);
//   }
//
//   /**
//    * Return true if attribute or metadata found on this type
//    */
//   static HasProperties(type: TypeInfo): boolean {
//     return type.hasOwnProperties();
//   }
// }
