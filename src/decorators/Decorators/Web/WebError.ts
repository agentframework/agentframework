export interface WebError extends Error {
  /**
   * The header
   */
  headers: any;

  /**
   * The status code of the error, defaulting to 500
   * @returns {number}
   */
  statusCode: number;

  /**
   * The status message of the error, defaulting to 'Knowledges Server Error'
   * @returns {number}
   */
  statusMessage: string;
}
