/**
 * Collection -> DataLayer (add audit info) -> Connector
 */
export class DataLayer {
  get connected(): boolean {
    throw new Error('DataLayer.connected not implemented');
  }

  connect(): Promise<this> {
    throw new Error('DataLayer.connect not implemented');
  }
}
