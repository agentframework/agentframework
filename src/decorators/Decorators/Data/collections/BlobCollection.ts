import { DataCollection } from './DataCollection';
import { BlobLike } from '../blob/BlobLike';
import { BlobLayer } from '../blob/BlobLayer';
import { DeleteOneResult, InsertOneResult, Result } from '../Result';
import { PrimaryKey } from '../Types';
import { Scoped } from '../../DependencyInjection/Scoped';

/**
 * base collection
 */
export class BlobCollection<T extends BlobLike> extends DataCollection<T> {
  @Scoped()
  protected readonly layer!: BlobLayer;

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
   * find one
   */
  findOne(id: PrimaryKey): Promise<T | undefined> {
    return this.layer.findOne<T>(this.db, this.collection, id);
  }

  /**
   * calculate etag for an object
   */
  getETag(id: PrimaryKey): Promise<string | undefined> {
    return this.layer.getETag(this.db, this.collection, id);
  }

  /**
   * get url for an object
   */
  getURL(id: PrimaryKey): Promise<string | undefined> {
    return this.layer.getURL(this.db, this.collection, id);
  }
}
