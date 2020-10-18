import { Agent, AgentIdentifier, AgentParameters } from '../ClassConstructor';

export interface AsyncClassFactory {
  resolve<T extends AgentIdentifier>(target: T, params?: AgentParameters<T>, transit?: boolean): Promise<Agent<T>>;
}
