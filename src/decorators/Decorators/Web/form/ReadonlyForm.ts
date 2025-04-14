import { Attachment } from './Attachment';

export interface ReadonlyForm {
  get(name: string): string | Attachment | undefined;

  getText(name: string): string | undefined;

  getFile(name?: string): Attachment | undefined;

  getFiles(name?: string): Array<Attachment>;
}
