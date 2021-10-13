import { decorateClass } from './Decorate/decorateClass';
import { Agents } from './Knowledges/Agents';
import { Types } from './Knowledges/Types';

@decorateClass({ n: 'belowAgent' })
export class Agent {}

/**

 @decorateClass({ n: 'aboveAgent' })    // not able to find
 @exclusive('Agent')
 @decorateClass({ n: 'belowAgent' })
 export class Agent {
  @decorateMember({ n: 1 })
  name!: string;
}

 exports.Agent = class Agent {
};
 __decorate([
 decorateMember({ n: 1 })
 ], exports.Agent.prototype, "name", void 0);
 exports.Agent = __agent([
 decorateClass({ n: 'aboveAgent' }),
 exclusive('Agent'),
 decorateClass({ n: 'belowAgent' })
 ], exports.Agent);

 **/

/**
 * @internal
 */
export function RememberAgent(base: Function, receiver: Function): void {
  Agents.v1.set(receiver, base);
  Agents.v1.set(receiver.prototype, base.prototype);
}

/**
 * Return true if giving type is an agent
 */
export function IsAgent(target: Function | object): boolean {
  return Agents.v1.has(target);
}

/**
 * Find original type of the agent. same as IsAgent() && GetType()
 */
export function GetAgentType<T extends Function>(agent: T): T | undefined {
  return <T | undefined>Agents.v1.get(agent);
}

/**
 * @internal
 */
export function RememberType(base: Function, receiver: Function): void {
  Types.v1.set(base, receiver);
  Types.v1.set(base.prototype, receiver.prototype);
}

/**
 * Find real
 */
export function GetType<T extends Function | object>(type: T): T | undefined {
  return <T | undefined>Types.v1.get(type);
}
