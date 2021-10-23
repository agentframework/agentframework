/**
 * Annotation
 */
export interface Annotation {
  /**
   * Version
   */
  readonly v: number;
  /**
   * Attributes
   */
  readonly a?: ReadonlyArray<any>;
  /**
   * Metadata
   */
  readonly m?: ReadonlyMap<string, any>;
}
