export class TypeNotFoundError extends TypeError {
  readonly type: Function;

  constructor(type: Function) {
    super(`Type ${type.name} not found`);
    this.type = type;
  }
}
