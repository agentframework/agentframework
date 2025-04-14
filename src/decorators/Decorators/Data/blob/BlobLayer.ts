import { DataLayer } from '../DataLayer';
import { BlobLike } from './BlobLike';
import { PrimaryKey } from '../Types';
import { DeleteOneResult, InsertOneResult, Result } from '../Result';

/**
 * Blob layer
 */
export class BlobLayer extends DataLayer {
  /**
   * create collection
   */
  createCollection<T extends BlobLike>(db: string, collection: string, options?: unknown): Promise<Result> {
    throw new Error('BlobLayer.createCollection not implemented');
  }

  /**
   * delete collection
   */
  dropCollection<T extends BlobLike>(db: string, collection: string, options?: unknown): Promise<Result> {
    throw new Error('BlobLayer.dropCollection not implemented');
  }

  /**
   * insert one
   */
  insertOne<T extends BlobLike>(db: string, collection: string, id: PrimaryKey, blob: T, options?: unknown): Promise<InsertOneResult> {
    throw new Error('BlobLayer.insertOne not implemented');
  }

  /**
   * delete one
   */
  deleteOne<T extends BlobLike>(db: string, collection: string, id: PrimaryKey, options?: unknown): Promise<DeleteOneResult> {
    throw new Error('BlobLayer.deleteOne not implemented');
  }

  /**
   * find one
   */
  findOne<T extends BlobLike>(db: string, collection: string, id: PrimaryKey, options?: unknown): Promise<T | undefined> {
    throw new Error('BlobLayer.findOne not implemented');
  }

  /**
   * calculate etag for an object
   */
  getETag<T extends BlobLike>(db: string, collection: string, id: PrimaryKey, payload?: T, options?: unknown): Promise<string | undefined> {
    throw new Error('BlobLayer.getETag not implemented');
  }

  /**
   * get url for an object
   */
  getURL<T extends BlobLike>(db: string, collection: string, id: PrimaryKey, payload?: T, options?: unknown): Promise<string | undefined> {
    throw new Error('BlobLayer.getURL not implemented');
  }
}
