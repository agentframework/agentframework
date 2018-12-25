// import { Constructor } from './Constructor';
// import { Property } from './Reflection/Property';
// import { GetPrototypeArray } from './Internal/Utils';
// import { Reflector } from './Reflector';
// import { PropertyFilters } from './Reflection/PropertyFilters';
// import { AgentFeatures } from './AgentFeatures';
// import { IAttribute } from './IAttribute';
// import { Prototype } from './Reflection/Prototype';
//
// /**
//  * @ignore
//  * @hidden
//  */
// export class Lookup {
//   /**
//    * Find all properties with interceptor defined
//    */
//   public static findInterceptors<T>(typeOrInstance: Constructor<T>): Property<Prototype>[] {
//     const prototypes = GetPrototypeArray(typeOrInstance);
//
//     let results: Property<Prototype>[] = [];
//
//     for (const proto of prototypes.reverse()) {
//       const behaviors = Reflector(proto).findProperties(PropertyFilters.FilterFeatures, AgentFeatures.Interceptor);
//
//       results = results.concat(behaviors);
//     }
//
//     return results;
//   }
//
//   /**
//    * Find all properties with initializer defined
//    */
//   public static findInitializers<T>(typeOrInstance: Constructor<T>): Property<Prototype>[] {
//     const prototypes = GetPrototypeArray(typeOrInstance);
//
//     let results: Property<Prototype>[] = [];
//
//     for (const proto of prototypes.reverse()) {
//       const behaviors = Reflector(proto).findProperties(PropertyFilters.FilterFeatures, AgentFeatures.Initializer);
//
//       results = results.concat(behaviors);
//     }
//
//     return results;
//   }
//
//   /**
//    * Find all properties with giving attribute on
//    */
//   public static findByAttribute<T>(
//     typeOrInstance: Constructor<T>,
//     attribute: Constructor<IAttribute>
//   ): Property<Prototype>[] {
//     const prototypes = GetPrototypeArray(typeOrInstance);
//
//     let results: Property<Prototype>[] = [];
//
//     for (const proto of prototypes.reverse()) {
//       const behaviors = Reflector(proto).findProperties(PropertyFilters.FilterAttribute, attribute);
//
//       results = results.concat(behaviors);
//     }
//
//     return results;
//   }
// }
