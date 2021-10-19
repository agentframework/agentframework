export class Agent {}

/**

 @decorateClass({ n: 'aboveAgent' })    // not able to find
 @exclusive('Agent')
 @decorateClass({ n: 'belowAgent' })
 export class Agent {
  @decorateMember({ n: 1 })
  name!: string;
}

 exports.Agent = class Agent {
};
 __decorate([
 decorateMember({ n: 1 })
 ], exports.Agent.prototype, "name", void 0);
 exports.Agent = __agent([
 decorateClass({ n: 'aboveAgent' }),
 exclusive('Agent'),
 decorateClass({ n: 'belowAgent' })
 ], exports.Agent);

 **/
