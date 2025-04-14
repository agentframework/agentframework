export interface Attachment {
  /**
   * Name of the attachment in form
   */
  name: string;
  /**
   * Data binary
   */
  data: Uint8Array;
  /**
   * original file name
   */
  originalname: string;
  /**
   * type
   */
  mimetype: string;
  /**
   * encoding
   */
  encoding: string;
}
