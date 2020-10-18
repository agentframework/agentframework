import { Arguments } from '../../../dependencies/core';
import { Agent, AnyClass } from '../ClassConstructor';
import { CreateDomainAgent } from './CreateDomainAgent';
import { Domain } from '../Domain';
import { Knowledge } from '../Knowledge';
// import { Upgrade } from '../Helpers/Upgrade';
// import { ClassInitializer } from '../Symbols';
// import { ConstructorInvocation } from '@agentframework/core/Core/Compiler/Invocation/ConstructorInvocation';

/**
 * Create domain agent
 */
export function ConstructDomainAgent<T>(
  domain: Domain,
  target: AnyClass<T>,
  params: Arguments
): Agent<T> | Promise<Agent<T>> {
  // if (typeof target !== 'function') {
  //   throw new TypeError('target is not constructor');
  // }
  // if (typeof params !== 'object') {
  //   // avoid using string is ArrayLike
  //   throw new TypeError('parameter type is not array');
  // }
  // upgrade to agent
  // const AgentClass = Upgrade(<Constructor<T>>target);

  // upgrade to domain agent, all instance create from this type will belong to the domain
  const DomainAgent = Knowledge.GetDomainAgent(domain, target) || CreateDomainAgent(domain, target);

  // if (target === DomainAgentClass) {
  // console.log('old ', target, IsAgent(target));
  // console.log('new ', DomainAgentClass);
  //   return Domain.construct(DomainAgentClass, params);
  // }

  return Reflect.construct(DomainAgent, params);

  // only get the closest initializer from target
  // const initializer = target[ClassInitializer];
  //
  // // in case of human mistake, check prototype if no static initializer function found
  // if (initializer) {
  //   if (typeof initializer === 'function') {
  //     // found class initializer function
  //     // create instance using initializer function
  //     console.log('target', target);
  //     console.log('DomainAgent', DomainAgent);
  //
  //     //(domain: Domain, target: ClassInvocation, params: Arguments, receiver: any)
  //     const invocation = new ConstructorInvocation(target, Reflector(target));
  //
  //     const newCreated = Reflect.apply(initializer, target, [domain, invocation, params, DomainAgent]);
  //     // if (!(newCreated instanceof DomainAgentClass)) {
  //     //   console.log('invalid new domain agent');
  //     //   console.log('new Required', DomainAgentClass);
  //     //   console.log('new Created', newCreated);
  //     // }
  //     return newCreated;
  //   } else {
  //     throw new SyntaxError('ClassInitializerMustFunction');
  //   }
  // } else {
  //   // TODO: move this code to static check during compilation to avoid human mistakes
  //   // if (target.prototype[ClassInitializer]) {
  //   //   throw new SyntaxError('ClassInitializerMustStatic');
  //   // }
  //   return Reflect.construct(DomainAgent, params);
  // }
}
