import { AgentInvocation } from '../Invocation/AgentInvocation';
import { IInitializer } from '../../Core/IInitializer';
import { Agents } from '../../Core/Cache';
import { LazyClassInitializer } from './LazyClassInitializer';

/**
 * Build a class which lazy cached constructor
 */
export class ClassInitializer implements IInitializer {
  
  initialize(invocation: AgentInvocation, parameters: ArrayLike<any>): any {
    const target = invocation.target;
    const targetName = target.name === 'Reflect' || target.name === 'target' ? 'Agent' : target.name || 'Agent';
    const newTarget = new Function(
      'Reflect',
      targetName,
      'target',
      `return class ${targetName}$ extends ${targetName}{constructor(){return Reflect.construct(new.target,()=>Reflect.intercept(arguments),arguments,target)}}`
    )(LazyClassInitializer, target, invocation.attribute); // this.prototype is not available here
    Agents.set(newTarget, target);
    return newTarget;
  }
}
