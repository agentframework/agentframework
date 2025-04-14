import { DataLayer } from '../DataLayer';
import { RecordLike } from './RecordLike';
import { DeleteOneResult, InsertOneResult, ReplaceOneResult, Result, UpdateOneResult } from '../Result';
import { PrimaryKey } from '../Types';

/**
 * Key-value storage
 */
export class RecordLayer extends DataLayer {
  /**
   * create collection
   */
  createCollection(db: string, collection: string, options?: unknown): Promise<Result> {
    throw new Error('RecordLayer.createCollection not implemented');
  }

  /**
   * delete collection
   */
  dropCollection(db: string, collection: string, options?: unknown): Promise<Result> {
    throw new Error('RecordLayer.dropCollection not implemented');
  }

  /**
   * insert one
   */
  insertOne<T extends RecordLike>(db: string, collection: string, id: PrimaryKey, insert: T, options?: unknown): Promise<InsertOneResult> {
    throw new Error('RecordLayer.insertOne not implemented');
  }

  /**
   * delete one
   */
  deleteOne(db: string, collection: string, id: PrimaryKey, options?: unknown): Promise<DeleteOneResult> {
    throw new Error('RecordLayer.deleteOne not implemented');
  }

  /**
   * replace one
   */
  replaceOne<T extends RecordLike>(db: string, collection: string, id: PrimaryKey, replace: T, options?: unknown): Promise<ReplaceOneResult> {
    throw new Error('RecordLayer.replaceOne not implemented');
  }

  /**
   * merge one
   */
  mergeOne<T extends RecordLike>(db: string, collection: string, id: PrimaryKey, merge: Partial<T>, options?: unknown): Promise<UpdateOneResult> {
    throw new Error('RecordLayer.mergeOne not implemented');
  }

  /**
   * count
   */
  countRecords(db: string, collection: string, options?: unknown): Promise<number> {
    throw new Error('RecordLayer.countRecords not implemented');
  }

  /**
   * estimated count
   */
  estimatedRecordCount(db: string, collection: string, options?: unknown): Promise<number> {
    throw new Error('RecordLayer.estimatedRecordCount not implemented');
  }

  /**
   * find one
   */
  findOne<T extends RecordLike>(db: string, collection: string, id: PrimaryKey, options?: unknown): Promise<T | undefined> {
    throw new Error('RecordLayer.createCollection not implemented');
  }

  /**
   * calculate etag for an object
   */
  getETag<T extends RecordLike>(db: string, collection: string, id: PrimaryKey, payload?: T, options?: unknown): Promise<string | undefined> {
    throw new Error('RecordLayer.getETag not implemented');
  }
}
