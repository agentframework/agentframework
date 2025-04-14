/**
 * primary key may encode to string using following format for the provider only support string primary key
 *
 *    num~1
 *    str~1
 *    bin~hhffbbaaccdd
 *    dat~290389383
 *    oid~hhffbbaaccdd
 *
 */
export type Doc = object;

export type PrimaryKey = number | string | boolean | Uint8Array | Date;

export type PrimaryKeyOrQuery = PrimaryKey | Doc;

export type Payload<T> = { _id?: PrimaryKey } & Pick<T, Exclude<keyof T, '_id'>>;

export type DataPayload = { _id?: PrimaryKey };

export type Data<T> = T & { _id: PrimaryKey };
