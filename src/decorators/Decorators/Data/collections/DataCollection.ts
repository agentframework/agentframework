import { DataLayer } from '../DataLayer';
import { Constructor } from '../Constructor';


export abstract class DataCollection<T extends object> {
  protected readonly layer!: DataLayer;
  protected readonly model?: Constructor<T>;
  protected readonly collection: string;
  protected readonly db: string;

  constructor();
  constructor(collection: string, db?: string);
  constructor(model: Constructor<T>, collection?: string, db?: string);
  constructor(modelOrCollection?: Constructor<T> | string, collection?: string, db?: string) {
    if (typeof modelOrCollection === 'string') {
      this.model = undefined;
      this.collection = modelOrCollection;
      this.db = collection || '';
    } else {
      this.model = modelOrCollection;
      this.collection = collection || this.extractCollectionName(new.target, modelOrCollection);
      this.db = db || '';
    }
  }

  extractCollectionName(type: Function, model?: Function): string {
    const name = type.name;
    if (name.length > 10 && name.endsWith('Collection')) {
      return name.slice(0, -10).toLowerCase();
    }
    return name.toLowerCase();
  }

  get connected(): boolean {
    return this.layer.connected;
  }

  connect(): Promise<this> {
    return this.layer.connect().then(() => this);
  }
}
