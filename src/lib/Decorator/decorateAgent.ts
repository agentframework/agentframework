import { IAttribute } from '../Core/IAttribute';
import { CanDecorate } from '../Compiler/Internal/Utils';
import { CreateAgentInvocation } from '../Compiler/CreateAgentInvocation';
import { AgentAttribute } from '../Core/AgentAttribute';
import { Reflector } from '../Core/Reflector';

/**
 * Decorate an agent with customized initializer, interceptors and attributes
 *
 * @param {AgentAttribute} agentAttribute
 * @param {IAttribute[]} attributes
 * @returns {ClassDecorator}
 */
export function decorateAgent(agentAttribute: AgentAttribute, attributes?: IAttribute[]): ClassDecorator {
  // upgrade target constructor to agent
  // this method will be called
  return <T extends Function>(target: T): T | void => {
    // apply extra attributes
    if (attributes && attributes.length) {
      const reflection = Reflector(target);
      for (const attribute of attributes) {
        if (CanDecorate(attribute, target)) {
          reflection.addAttribute(attribute);
        }
      }
    }

    // the attributes to initialize agent constructor
    // current only support only one initializer, multiple interceptors
    if (CanDecorate(agentAttribute, target)) {
      const invocation = CreateAgentInvocation(target, agentAttribute);
      // run this pipeline to generate a new constructor for this giving type
      return invocation.invoke(arguments);
    }
  };
}
