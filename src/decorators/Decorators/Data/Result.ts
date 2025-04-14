import { PrimaryKey } from './Types';

export interface Result {
  /**
   * Indicates whether this write result was acknowledged. If not, then all
   * other members of this result will be undefined.
   *
   * NOT REQUIRED: Drivers may choose to not provide this property.
   *
   */
  acknowledged: boolean;
}

export interface InsertResult extends Result {
  insertedCount?: number;
}

export interface InsertOneResult extends InsertResult {
  /**
   * The identifier that was inserted. If the server generated the identifier, this value
   * will be null as the driver does not have access to that data.
   *
   * NOT REQUIRED: Drivers may choose to not provide this property.
   */
  insertedId?: PrimaryKey;
}

export interface InsertManyResult extends InsertResult {
  /**
   * Map of the index of the inserted document to the id of the inserted document.
   *
   * NOT REQUIRED: Drivers may choose to not provide this property.
   */
  insertedIds?: Map<number, PrimaryKey>;
}

export interface UpdateResult extends Result {
  /**
   * The number of documents that matched the filter.
   */
  matchedCount?: number;

  /**
   * The number of documents that were modified.
   */
  modifiedCount?: number;
}

export interface UpdateOneResult extends UpdateResult {}

export interface MergeOneResult extends UpdateOneResult {}

export interface ReplaceOneResult extends UpdateOneResult {}

export interface UpsertResult extends UpdateResult {
  /**
   * The number of documents that were upserted.
   *
   * NOT REQUIRED: Drivers may choose to not provide this property so long as
   * it is always possible to infer whether an upsert has taken place. Since
   * the "_id" of an upserted document could be null, a null "upsertedId" may
   * be ambiguous in some drivers. If so, this field can be used to indicate
   * whether an upsert has taken place.
   */
  upsertedCount?: number;
}

export interface UpsertOneResult extends UpsertResult {
  /**
   * The identifier of the inserted document if an upsert took place.
   */
  upsertedId?: PrimaryKey;
}

export interface DeleteResult extends Result {
  /**
   * The number of documents that were deleted.
   */
  deletedCount?: number;
}

export interface DeleteOneResult extends DeleteResult {}

export interface DeleteManyResult extends DeleteResult {}
