import { Agent, AgentIdentifier, AgentParameters } from '../ClassConstructor';

export interface ClassFactory {
  construct<T extends AgentIdentifier>(target: T, params?: AgentParameters<T>, transit?: boolean): Agent<T>;
}
