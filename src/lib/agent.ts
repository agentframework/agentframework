import { decorateAgent } from './core/decorator';
import { IsNullOrUndefined } from './core/utils';
import { Reflector } from './core/reflector';
import { AgentAttribute } from './core/agent';

// ===========================================
// ES2015 or before
// ===========================================
/* istanbul ignore if  */
if (typeof Reflect !== 'object') {
  throw new Error('Agent Framework requires ES2016 support');
}

// ===========================================
// ES2016 and before
// ===========================================
if (typeof Reflect['metadata'] !== 'function') {
  // Install Reflect.metadata for tsc only
  // tsc will add following code to the generated js file. in order to utilize these information.
  // we create and method of Reflect.metadata to inject these information to Reflection object
  //     Reflect.metadata("design:type", Function),
  //     Reflect.metadata("design:paramtypes", []),
  //     Reflect.metadata("design:returntype", String)
  Reflect['metadata'] = function (key: string, value: any) {
    return function (target: Object | Function, propertyKey?: string | symbol, descriptor?: PropertyDescriptor): void {
      if (IsNullOrUndefined(propertyKey)) {
        Reflector(target).addMetadata(key, value);
      } else {
        Reflector(target)
          .property(propertyKey, descriptor)
          .addMetadata(key, value);
      }
    };
  };
} else {
  // ===========================================
  // ES2017, ES2018, ES2019 - no need any hack
  // ===========================================
}

/**
 * Define an agent
 * @returns {(target:Constructor)=>(void|Constructor)}
 */
export function agent(...args) {
  return decorateAgent(Reflect.construct(AgentAttribute, args));
}
