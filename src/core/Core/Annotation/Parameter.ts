import { Annotation } from './Annotation';

export class Parameter extends Annotation {
  constructor(readonly parent: Annotation) {
    super();
  }
}
