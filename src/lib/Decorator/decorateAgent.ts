import { IAttribute } from '../Core/IAttribute';
import { CanDecorate } from '../Compiler/Internal/Utils';
import { CreateAgentInvocation } from '../Compiler/CreateAgentInvocation';
import { AgentAttribute } from '../Core/AgentAttribute';
import { Reflector } from '../Core/Reflector';

/**
 * Decorate an agent with customized initializer, interceptors and attributes
 *
 * @param {AgentAttribute} constructorAttribute
 * @param {IAttribute[]} instanceAttributes
 * @returns {ClassDecorator}
 */b
export function decorateAgent(constructorAttribute: IAttribute, instanceAttributes?: IAttribute[]): ClassDecorator {
  // upgrade target constructor to agent
  // this method will be called
  return <T extends Function>(target: T): T | void => {
    // apply extra attributes
    if (instanceAttributes && instanceAttributes.length) {
      const type = Reflector(target);
      for (const attribute of instanceAttributes) {
        if (CanDecorate(attribute, target)) {
          type.addAttribute(attribute);
        }
      }
    }

    // the attributes to initialize agent constructor
    // current only support only one initializer, multiple interceptors
    if (CanDecorate(constructorAttribute, target)) {
      // run this pipeline to generate a new constructor for this giving type
      return CreateAgentInvocation(target, constructorAttribute).invoke(arguments);
    }
    return target;
  };
}
