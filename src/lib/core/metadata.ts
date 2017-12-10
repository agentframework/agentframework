// import { Reflection } from './reflection';
// import { IsNullOrUndefined } from './utils';
//
// // create a unique, global symbol name
// // -----------------------------------
// const METADATA_KEY = Symbol.for('agent.framework.metadata');
//
// // check if the global object has this symbol
// // add it if it does not have the symbol, yet
// // ------------------------------------------
// if (!Reflect.has(global, METADATA_KEY)) {
//   // create metadata store only if the global symbol not exits
//   Reflect.set(global, METADATA_KEY, new Map<Object | Function, Map<string | symbol, Reflection>>()); // Object.freeze(kernel); - this will break istanbul test
// }
//
// // ensure the metadata can be access
// // ---------------------------------
// if (!Reflect.has(global, METADATA_KEY)) {
//   throw new Error('Unable to create Agent Framework Metadata')
// }
//
//
// // Reflect.defineMetadata(metadataKey, metadataValue, C.prototype, "method");
// // let metadataValue = Reflect.getMetadata(metadataKey, obj, "method");
//
//
// /**
//  * Internal Metadata store
//  *
//  * Reflection -> Access Metadata
//  *
//  * < prototype: <key: Reflection> >
//  *
//  */
// export class Metadata {
//
//   private static _metadata: Map<Object | Function, Map<string | symbol, Reflection>> = Reflect.get(global, METADATA_KEY);
//   private static _empty: Map<string | symbol, Reflection> = new Map<string | symbol, Reflection>();
//
//   constructor() {
//   }
//
//   public static getAll(target: Object | Function): Map<string | symbol, Reflection> {
//     if (this._metadata.has(target)) {
//       return this._metadata.get(target);
//     }
//     else {
//       return this._empty;
//     }
//   }
//
//   public static get(target: Object | Function, method?: string | symbol): Reflection | null {
//     if (this._metadata.has(target)) {
//       return this._metadata.get(target).get(IsNullOrUndefined(method) ? '' : method);
//     }
//     else {
//       const proto = Object.getPrototypeOf(target);
//       if (proto && this._metadata.has(proto)) {
//         return this._metadata.get(proto).get(IsNullOrUndefined(method) ? '' : method);
//       }
//       else {
//         return null;
//       }
//     }
//   }
//
//   public static getOwn(target: Object | Function, method?: string | symbol): Reflection | null {
//     if (this._metadata.has(target)) {
//       return this._metadata.get(target).get(IsNullOrUndefined(method) ? '' : method);
//     }
//     else {
//       return null;
//     }
//   }
//
//   public static saveOwn(reflection: Reflection, target: Object | Function, method?: string | symbol): void {
//     if (!this._metadata.has(target)) {
//       this._metadata.set(target, new Map<string | symbol, Reflection>());
//     }
//     this._metadata.get(target).set(IsNullOrUndefined(method) ? '' : method, reflection);
//   }
//
// }
