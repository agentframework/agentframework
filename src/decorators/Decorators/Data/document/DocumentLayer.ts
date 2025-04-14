import { DataLayer } from '../DataLayer';
import { DocumentLike } from './DocumentLike';
import { InsertOneResult, Result, DeleteResult, UpdateOneResult } from '../Result';
import { Doc, PrimaryKey, Payload } from '../Types';
import { FindOptions } from './options/FindOptions';
import { FindOneOptions } from './options/FindOneOptions';
import { FindOneByIdOptions } from './options/FindOneByIdOptions';

/**
 * Document layer
 */
export class DocumentLayer extends DataLayer {
  /**
   * create collection
   */
  createCollection(db: string, collection: string, options?: unknown): Promise<Result> {
    throw new Error('DocumentLayer.createCollection not implemented');
  }

  /**
   * delete collection
   */
  dropCollection(db: string, collection: string, options?: unknown): Promise<Result> {
    throw new Error('DocumentLayer.dropCollection not implemented');
  }

  /**
   * insert one
   */
  insertOne<T extends DocumentLike>(db: string, collection: string, document: Payload<T>, options?: unknown): Promise<InsertOneResult> {
    throw new Error('DocumentLayer.insertOne not implemented');
  }

  /**
   * delete one
   */
  deleteOne<T extends DocumentLike>(db: string, collection: string, filter: Doc, options?: unknown): Promise<DeleteResult> {
    throw new Error('DocumentLayer.deleteOne not implemented');
  }

  /**
   * merge one
   */
  mergeOne<T extends DocumentLike>(
    db: string,
    collection: string,
    filter: Doc,
    merge: Partial<T>,
    options?: unknown
  ): Promise<UpdateOneResult> {
    throw new Error('DocumentLayer.mergeOne not implemented');
  }

  /**
   * merge exist or insert one
   */
  mergeOneOrInsert<T extends DocumentLike>(
    db: string,
    collection: string,
    filter: Doc,
    merge: Partial<T>,
    options?: unknown
  ): Promise<UpdateOneResult> {
    throw new Error('DocumentLayer.mergeOneOrInsert not implemented');
  }

  /**
   * replace one
   */
  replaceOne<T extends DocumentLike>(
    db: string,
    collection: string,
    filter: Doc,
    replacement: Payload<T>,
    options?: unknown
  ): Promise<UpdateOneResult> {
    throw new Error('DocumentLayer.replaceOne not implemented');
  }

  /**
   * replace exist or insert one
   */
  replaceOneOrInsert<T extends DocumentLike>(
    db: string,
    collection: string,
    filter: Doc,
    replacement: Payload<T>,
    options?: unknown
  ): Promise<UpdateOneResult> {
    throw new Error('DocumentLayer.replaceOneOrInsert not implemented');
  }

  /**
   * count documents
   */
  countDocuments<T extends DocumentLike>(db: string, collection: string, filter?: Doc, options?: unknown): Promise<number> {
    throw new Error('DocumentLayer.countDocuments not implemented');
  }

  /**
   * estimated document count
   */
  estimatedDocumentCount(db: string, collection: string, options?: unknown): Promise<number> {
    throw new Error('DocumentLayer.estimatedDocumentCount not implemented');
  }

  /**
   * find
   */
  find<T extends DocumentLike>(db: string, collection: string, filter: Doc, options?: FindOptions): Promise<Array<T>> {
    throw new Error('DocumentLayer.find not implemented');
  }

  /**
   * find one
   */
  findOne<T extends DocumentLike>(db: string, collection: string, filter: Doc, options?: FindOneOptions): Promise<T | undefined> {
    throw new Error('DocumentLayer.findOne not implemented');
  }

  /**
   * find one by id
   */
  findOneById<T extends DocumentLike>(
    db: string,
    collection: string,
    id: PrimaryKey,
    options?: FindOneByIdOptions
  ): Promise<T | undefined> {
    throw new Error('DocumentLayer.findOneById not implemented');
  }

  /**
   * find one and insert
   */
  findOneAndInsert<T extends DocumentLike>(
    db: string,
    collection: string,
    filter: Doc,
    document: T,
    options?: FindOneOptions
  ): Promise<T | undefined> {
    throw new Error('DocumentLayer.findOneAndInsert not implemented');
  }

  /**
   * find one and merge
   */
  findOneAndMerge<T extends DocumentLike>(
    db: string,
    collection: string,
    filter: Doc,
    merge: Partial<T>,
    options?: FindOneOptions
  ): Promise<T | undefined> {
    throw new Error('DocumentLayer.findOneAndMerge not implemented');
  }

  /**
   * find one and replace
   */
  findOneAndReplace<T extends DocumentLike>(
    db: string,
    collection: string,
    filter: Doc,
    replacement: Payload<T>,
    options?: FindOneOptions
  ): Promise<T | undefined> {
    throw new Error('DocumentLayer.findOneAndReplace not implemented');
  }

  /**
   * find one and delete
   */
  findOneAndDelete<T extends DocumentLike>(db: string, collection: string, filter: Doc, options?: FindOneOptions): Promise<T | undefined> {
    throw new Error('DocumentLayer.findOneAndDelete not implemented');
  }

  /**
   * calculate etag for an object
   */
  getETag<T extends DocumentLike>(
    db: string,
    collection: string,
    id: PrimaryKey,
    payload?: T,
    options?: unknown
  ): Promise<string | undefined> {
    throw new Error('DocumentLayer.getETag not implemented');
  }
}
