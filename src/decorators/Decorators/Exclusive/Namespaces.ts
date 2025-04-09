import { Remember } from '@agentframework/core';

/**
 * Get object of giving string id
 */
export class Namespaces {
  // key: string, value: Constructor
  static get v1() {
    return Remember('Namespaces', this, 'v1', () => new Map<string, unknown>());
  }
}
