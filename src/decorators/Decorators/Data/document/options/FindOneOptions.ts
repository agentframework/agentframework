import { FindOneByIdOptions } from './FindOneByIdOptions';

export interface FindOneOptions extends FindOneByIdOptions {
  /**
   * Limits the fields to return for all matching documents.
   *
   * This option is sent only if the caller explicitly provides a value. The default is to not send a value.
   *
   * @see https://docs.mongodb.com/manual/reference/command/find/
   */
  projection?: any;

  /**
   * The order in which to return matching documents.
   *
   * This option is sent only if the caller explicitly provides a value. The default is to not send a value.
   *
   * @see https://docs.mongodb.com/manual/reference/command/find/
   */
  sort?: any;

  /**
   * The number of documents to skip before returning.
   *
   * This option is sent only if the caller explicitly provides a value. The default is to not send a value.
   * For servers < 3.2, this is a wire protocol parameter that defaults to 0.
   *
   * @see https://docs.mongodb.com/manual/reference/command/find/
   */
  skip?: number;
}
