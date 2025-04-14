import { FindOneOptions } from './FindOneOptions';

export interface FindOptions extends FindOneOptions {
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

  /**
   * The maximum number of documents to return.
   *
   * This option is sent only if the caller explicitly provides a value. The default is to not send a value.
   * For servers < 3.2, this is combined with batchSize to create the wire protocol numberToReturn value.
   *
   * A negative limit implies that the caller has requested a single batch of results. For servers >= 3.2, singleBatch
   * should be set to true and limit should be converted to a positive value. For servers < 3.2, the wire protocol
   * numberToReturn value may be negative.
   *
   * @see https://docs.mongodb.com/manual/reference/command/find/
   */
  limit?: number;
}
