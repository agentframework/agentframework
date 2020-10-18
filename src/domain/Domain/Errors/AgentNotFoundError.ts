export class AgentNotFoundError extends TypeError {
  readonly type: Function;

  constructor(type: Function) {
    super(`Agent ${type.name} not found`);
    this.type = type;
  }
}
