export interface BlobLike {
  type: string;
  byteLength: number;
  encoding?: string;
  data?: Uint8Array;
  stream?: unknown;
  url?: string;
}

// export interface Blob extends BlobLike {
//   type: string;
//   byteLength: number;
//   data: Uint8Array;
// }

// id: string;
// name: string;
// type: string;
// byteLength: number;
// data: Uint8Array;
// url?: string; // original url of this blob object, if have
