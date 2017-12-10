/**
 * Domain interface
 */
import { Reflection } from './core/reflection';

export interface IDomain {
  
  /**
   *
   * @param filter
   * @param filterCriteria
   * @returns {Reflection[]}
   */
  findTypes(filter, filterCriteria: any): Reflection[];
  
  /**
   * Return the type information for this prototype
   * @param {Object} prototype
   * @param {boolean} throwOnError
   * @returns {Reflection[]}
   */
  getType(prototype: object, throwOnError?: boolean): Reflection;
  
  /**
   * Returns all the types defined within this registry.
   * @returns {Reflection[]}
   */
  getTypes(): Reflection[];
  
  /**
   * Resolve a type from a hash key
   * @returns {Reflection}
   */
  resolveType(hash: string): Reflection;
  
  // /**
  //  *
  //  */
  // identifier(): string;
  //
  // /**
  //  * Register created agent type with user type
  //  * @param userType
  //  * @param agentType
  //  */
  // register(userType: any, agentType: any): void;
  //
  // /**
  //  * Add an agent to domain
  //  * @param agentType
  //  */
  // addAgent(agentType: Constructor): void;
  //
  // /**
  //  * Create an agent and added to domain
  //  * @param agentType
  //  * @param parameters
  //  */
  // createAgent(agentType: Constructor, ...parameters: Array<any>): Object;
  //
  // /**
  //  * Get the agent from domain or create previous added agent. Throw error if identifier not found.
  //  * @param typeOrIdentifier
  //  */
  // getAgent(typeOrIdentifier: Constructor | string): Object;
  //
  // /**
  //  * Register agent with provided agent attribute
  //  * @param {AgentAttribute} agentAttribute
  //  * @param {Object} agent
  //  */
  // registerAgent(agentAttribute: AgentAttribute, agent: Object);
  //
  // /**
  //  * Register agent type with provided agent attribute
  //  * @param {AgentAttribute} agentAttribute
  //  * @param {Agent} agentType
  //  */
  // registerAgentType(agentAttribute: AgentAttribute, agentType: Constructor);

}

export interface AgentFilter {
  (value: Reflection, index: number, array: Reflection[]): boolean;
}

// /**
//  * Domain
//  */
// export class InMemoryDomain implements IDomain {
//
//   protected _identifier: string;
//
//   /**
//    * Key: dynamic generated agent type
//    * Value: user class
//    */
//   protected userTypes: WeakMap<any, any> = new WeakMap<any, any>();
//
//   /**
//    * Key: user class
//    * Value: dynamic generated agent type
//    */
//   protected agentTypes: WeakMap<any, any> = new WeakMap<any, any>();
//
//
//   protected types: Map<string, Constructor> = new Map<string, Constructor>();
//   protected agents: Map<string, Object> = new Map<string, Object>();
//
//   constructor(identifier?: string) {
//     this._identifier = identifier;
//   }
//
//   /**
//    * Identifier of this domain
//    */
//   identifier(): string {
//     return this._identifier;
//   }
//
//   /**
//    * Register created agent type with origin type
//    * @param userType
//    * @param agentType
//    */
//   register(userType: any, agentType: any) {
//     if (this.userTypes.has(agentType)) {
//       throw new Error(`Agent ${agentType.prototype.constructor.name} already registered with domain ${this._identifier}`)
//     }
//     if (this.agentTypes.has(userType)) {
//       throw new Error(`Class ${userType.prototype.constructor.name} already registered with domain ${this._identifier}`)
//     }
//     this.userTypes.set(agentType, userType);
//     this.agentTypes.set(userType, agentType);
//   };
//
//   registerAgentType(agentAttribute: IAgentAttribute, agentType: Constructor) {
//     if (!agentAttribute.identifier) {
//       return;
//     }
//     else if (this.types.has(agentAttribute.identifier)) {
//       throw new TypeError(`Duplicated agent type identifier ${agentAttribute.identifier} is not allowed`);
//     }
//     else {
//       // console.log(`Agent type ${agentType.name} registered as ${agentAttribute.identifier}`);
//       this.types.set(agentAttribute.identifier, agentType);
//     }
//   }
//
//   registerAgent(agentAttribute: AgentAttribute, agent: Object) {
//     if (!agentAttribute.identifier) {
//       return;
//     }
//     else if (this.agents.has(agentAttribute.identifier)) {
//       throw new TypeError(`Duplicated agent identifier ${agentAttribute.identifier} is not allowed`);
//     }
//     else {
//       // console.log(`Agent ${agentType.name} registered as ${identifier}`);
//       this.agents.set(agentAttribute.identifier, agent);
//     }
//   }
//
//   public addAgent(agentType: Constructor): void {
//     const attributes = this.extractAgentAttributes(agentType);
//     attributes.forEach(attribute => {
//       if (this.agents.has(attribute.identifier)) {
//         throw new TypeError(`Can not add agent type. Duplicated agent type identifier ${attribute.identifier} is not allowed`);
//       }
//     });
//     attributes.forEach(attribute => {
//       this.registerAgentType(attribute, agentType);
//     });
//   }
//
//   public createAgent(agentType: Constructor, ...parameters: Array<any>): any {
//     const identifiers = this.extractIdentifiers(agentType);
//     identifiers.forEach(identifier => {
//       if (this.agents.has(identifier)) {
//         throw new TypeError(`Can not create agent. Duplicated agent identifier ${identifier} is not allowed`);
//       }
//     });
//     return Reflect.construct(agentType, [this, ...parameters]);
//   }
//
//   public getAgent(typeOrIdentifier: Constructor | string): Object {
//     if (typeof typeOrIdentifier === 'string') {
//       if (this.agents.has(typeOrIdentifier)) {
//         return this.agents.get(typeOrIdentifier);
//       }
//       else if (this.types.has(typeOrIdentifier)) {
//         const agentType = this.types.get(typeOrIdentifier);
//         return this.createAgent(agentType);
//       }
//       else {
//         throw new TypeError(`Agent ${typeOrIdentifier} not found`);
//       }
//     }
//     else {
//       return this.createAgent(typeOrIdentifier);
//     }
//   }
//
//   private extractAgentAttributes(agentType: Constructor): Array<AgentAttribute> {
//     return Reflection.getAttributes(agentType)
//       .filter(a => a instanceof AgentAttribute) as Array<AgentAttribute>;
//   }
//
//   private extractIdentifiers(agentType: Constructor) {
//     return this.extractAgentAttributes(agentType)
//       .map(a => (a as AgentAttribute).identifier)
//       .filter(a => a != null);
//   }
//
// }
//
//
// export let Domain = new InMemoryDomain('local');
