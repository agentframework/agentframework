/**
 * Represents a callback function that is used to filter a list of behavior represented in a map of Behavior objects.
 */
export interface Filter<T> {
  /**
   * @param {TypeInfo} value The Behavior object to which the filter is applied.
   * @param filterCriteria An arbitrary object used to filter the list.
   * @returns {boolean} `true` to include the behavior in the filtered list; otherwise false.
   */
  (value: T, filterCriteria?: any): boolean;
}
