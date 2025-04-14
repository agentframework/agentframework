import { Doc, Payload, PrimaryKey } from '../Types';
import { DeleteResult, InsertOneResult, Result, UpdateOneResult } from '../Result';
import { DataCollection } from './DataCollection';
import { FindOneOptions } from '../document/options/FindOneOptions';
import { FindOneByIdOptions } from '../document/options/FindOneByIdOptions';
import { FindOptions } from '../document/options/FindOptions';
import { Scoped } from '../../DependencyInjection/Scoped';
import { DocumentLike } from '../document/DocumentLike';
import { DocumentLayer } from '../document/DocumentLayer';

/**
 * base collection
 */
export class DocumentCollection<T extends DocumentLike> extends DataCollection<T> {
  @Scoped()
  protected readonly layer!: DocumentLayer;

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
  insertOne(document: Payload<T>): Promise<InsertOneResult> {
    return this.layer.insertOne(this.db, this.collection, document);
  }

  /**
   * delete one
   */
  deleteOne(filter: Doc): Promise<DeleteResult> {
    return this.layer.deleteOne(this.db, this.collection, filter);
  }

  /**
   * merge one
   */
  mergeOne(filter: Doc, merge: Partial<T>): Promise<UpdateOneResult> {
    return this.layer.mergeOne(this.db, this.collection, filter, merge);
  }

  /**
   * merge exist or insert one
   */
  mergeOneOrInsert(filter: Doc, merge: Partial<T>): Promise<UpdateOneResult> {
    return this.layer.mergeOneOrInsert(this.db, this.collection, filter, merge);
  }

  /**
   * replace one
   */
  replaceOne(filter: Doc, replacement: Payload<T>): Promise<UpdateOneResult> {
    return this.layer.replaceOne(this.db, this.collection, filter, replacement);
  }

  /**
   * replace exist or insert one
   */
  replaceOneOrInsert(filter: Doc, replacement: Payload<T>): Promise<UpdateOneResult> {
    return this.layer.replaceOneOrInsert(this.db, this.collection, filter, replacement);
  }

  /**
   * count documents
   */
  countDocuments(filter?: Doc): Promise<number> {
    return this.layer.countDocuments(this.db, this.collection, filter);
  }

  /**
   * estimated document count
   */
  estimatedDocumentCount(): Promise<number> {
    return this.layer.estimatedDocumentCount(this.db, this.collection);
  }

  /**
   * find
   */
  find(filter: Doc, options?: FindOptions): Promise<Array<T>> {
    return this.layer.find<T>(this.db, this.collection, filter, options);
  }

  /**
   * find one
   */
  findOne(filter: Doc, options?: FindOneOptions): Promise<T | undefined> {
    return this.layer.findOne<T>(this.db, this.collection, filter, options);
  }

  /**
   * find one by id
   */
  findOneById(id: PrimaryKey, options?: FindOneByIdOptions): Promise<T | undefined> {
    return this.layer.findOneById<T>(this.db, this.collection, id, options);
  }

  /**
   * find one and insert
   */
  findOneAndInsert(filter: Doc, document: T, options?: FindOneOptions): Promise<T | undefined> {
    return this.layer.findOneAndInsert<T>(this.db, this.collection, filter, document, options);
  }

  /**
   * find one and merge
   */
  findOneAndMerge(filter: Doc, merge: Partial<T>, options?: FindOneOptions): Promise<T | undefined> {
    return this.layer.findOneAndMerge<T>(this.db, this.collection, filter, merge, options);
  }

  /**
   * find one and replace
   */
  findOneAndReplace(filter: Doc, replacement: Payload<T>, options?: FindOneOptions): Promise<T | undefined> {
    return this.layer.findOneAndReplace<T>(this.db, this.collection, filter, replacement, options);
  }

  /**
   * find one and delete
   */
  findOneAndDelete(filter: Doc, options?: FindOneOptions): Promise<T | undefined> {
    return this.layer.findOneAndDelete<T>(this.db, this.collection, filter, options);
  }

  /**
   * calculate etag for an object
   */
  getETag(id: PrimaryKey, payload?: T): Promise<string | undefined> {
    return this.layer.getETag(this.db, this.collection, id, payload);
  }
}
