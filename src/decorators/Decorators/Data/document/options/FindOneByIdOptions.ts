export interface FindOneByIdOptions {
  /**
   * Limits the fields to return for all matching documents.
   *
   * This option is sent only if the caller explicitly provides a value. The default is to not send a value.
   *
   * @see https://docs.mongodb.com/manual/reference/command/find/
   */
  projection?: any;
}
