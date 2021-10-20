export interface Annotation extends ReadonlyMap<string, any> {
  readonly version: number;
  readonly attributes: ReadonlyArray<any>;
  readonly interceptors: ReadonlyArray<any>;
}
