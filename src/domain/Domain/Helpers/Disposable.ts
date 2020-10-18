export interface Disposable {
  /**
   * Return true if this domain been disposing
   */
  readonly disposing?: boolean;

  /**
   * Return true if this domain been disposed
   */
  readonly disposed?: boolean;

  /**
   * Dispose domain and release all agents
   */
  dispose?(): void;
}

export function IsDisposable(type: undefined | Disposable): type is object & Disposable {
  if (type && typeof type === 'object' && type['dispose'] && typeof type['dispose'] === 'function') {
    return true;
  }
  return false;
}
