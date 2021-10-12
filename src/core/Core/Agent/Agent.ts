import { exclusive } from '../Decorators/Exclusive/exclusive';
import { remember } from '../Decorators/Remember/remember';

@exclusive('Agent')
export class Agent {
  @remember('Agent')
  get v1() {
    return 1;
  }
}
