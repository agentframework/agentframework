import { AgentFrameworkError } from '../../../dependencies/core';

export class AgentNotFoundError extends AgentFrameworkError {
  readonly type: Function;

  constructor(type: Function) {
    super(`AgentNotFound: ${type.name}`);
    this.type = type;
  }
}
