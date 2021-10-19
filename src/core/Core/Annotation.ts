export interface Annotation extends ReadonlyMap<string, any> {
  readonly version: number;
  readonly attributes: ReadonlyArray<any>;
  push(attribute: any): number;
  add(key: string, value: any): void;
}
