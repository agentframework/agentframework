import { DataCollection } from './DataCollection';
import { RecordLike } from '../record/RecordLike';
import { RecordLayer } from '../record/RecordLayer';
import { DeleteOneResult, InsertOneResult, UpdateOneResult, Result } from '../Result';
import { Scoped } from '../../DependencyInjection/Scoped';
import { PrimaryKey } from '../Types';

/**
 * Key-Value Storage
 *
 * Collection is a user specified class which should be only created when needed and release as soon as possible.
 *
 * Suggested Scope: Request
 */
export class RecordCollection<T extends RecordLike> extends DataCollection<T> {
  @Scoped()
  protected readonly layer!: RecordLayer;

  /**
   * create collection
   */
  createCollection(): Promise<Result> {
    return this.layer.createCollection(this.db, this.collection);
  }

  /**
   * delete collection
   */
  dropCollection(): Promise<Result> {
    return this.layer.dropCollection(this.db, this.collection);
  }

  /**
   * insert one
   */
  insertOne(id: PrimaryKey, insert: T): Promise<InsertOneResult> {
    return this.layer.insertOne(this.db, this.collection, id, insert);
  }

  /**
   * delete one
   */
  deleteOne(id: PrimaryKey): Promise<DeleteOneResult> {
    return this.layer.deleteOne(this.db, this.collection, id);
  }

  /**
   * replace one
   */
  replaceOne(id: PrimaryKey, replace: T): Promise<UpdateOneResult> {
    return this.layer.replaceOne(this.db, this.collection, id, replace);
  }

  /**
   * update one
   */
  mergeOne(id: PrimaryKey, merge: Partial<T>): Promise<UpdateOneResult> {
    return this.layer.mergeOne(this.db, this.collection, id, merge);
  }

  /**
   * count
   */
  countRecords(): Promise<number> {
    return this.layer.countRecords(this.db, this.collection);
  }

  /**
   * estimated count
   */
  estimatedRecordCount(): Promise<number> {
    return this.layer.estimatedRecordCount(this.db, this.collection);
  }

  /**
   * find one
   */
  findOne(id: PrimaryKey): Promise<T | undefined> {
    return this.layer.findOne<T>(this.db, this.collection, id);
  }

  /**
   * calculate etag for an object
   */
  getETag(id: PrimaryKey, payload?: T): Promise<string | undefined> {
    return this.layer.getETag(this.db, this.collection, id, payload);
  }
}
