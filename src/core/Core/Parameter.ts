import { Annotation } from './Annotation';

/**
 * Parameter
 */
export class Parameter extends Annotation {
  constructor(readonly index: number) {
    super();
  }
}
