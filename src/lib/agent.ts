import { Reflector } from './Core/Reflector';
import { decorateAgent } from './Decorator/decorateAgent';
import { AgentAttribute } from './Core/AgentAttribute';
import { IAttribute } from './Core/IAttribute';
import { Resolve } from './Core/Resolver/Resolve';

// ===========================================
// ES2015 or before
// ===========================================
/* istanbul ignore if  */
if (typeof Reflect !== 'object') {
  throw new Error('Agent Framework requires ES2016 support');
}

const metadataFn = Reflect['metadata'];

// ===========================================
// ES2016 and before
// ===========================================
if (typeof metadataFn !== 'function') {
  // Install Reflect.metadata for tsc only
  // tsc will add following code to the generated js file. in order to utilize these information.
  // we create and method of Reflect.metadata to inject these information to Reflection object
  //     Reflect.metadata("design:type", Function),
  //     Reflect.metadata("design:paramtypes", []),
  //     Reflect.metadata("design:returntype", String)
  Reflect['metadata'] = function(key: string, value: any) {
    return function(target: Function | Object, property?: string | symbol, descriptor?: PropertyDescriptor): void {
      if (property) {
        Reflector(target)
          .property(property, descriptor)
          .addMetadata(key, value);
      } else {
        Reflector(target).addMetadata(key, value);
      }
    };
  };
  // tag this function to prevent inject itself
  Reflect['metadata']['$AgentFramework'] = true;
} else if (!metadataFn['$AgentFramework']) {
  // ========================================================================================
  // ES2017, ES2018 and later - intercept Reflect.metadata because tsc generate 3 parameters
  // ========================================================================================
  Reflect['metadata'] = function(key: string, value: any) {
    const metadataDecorator = metadataFn(key, value);
    return function(target: Function | Object, property?: string | symbol, descriptor?: PropertyDescriptor): void {
      if (property) {
        Reflector(target)
          .property(property, descriptor)
          .addMetadata(key, value);
        return metadataDecorator(<object>(<unknown>target), property!);
      } else {
        Reflector(target).addMetadata(key, value);
        return metadataDecorator(<Function>(<unknown>target));
      }
    };
  };
}

/**
 * Define an agent
 */
export function agent(attributes?: IAttribute[]) {
  return decorateAgent(Resolve(AgentAttribute), attributes);
}
