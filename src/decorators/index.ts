/*********************************************************************
 *   (Stability: 2 - Stable): Class Decorator: @agent()
 *********************************************************************/
export { agent } from './Decorators/agent';

/*********************************************************************
 *   (Stability: 2 - Stable): Class Decorator: @initializable()
 *********************************************************************/
export { initializable } from './Decorators/Initializable/initializable';
export { Initializer } from './Decorators/Initializable/Initializer';
export { InitializerHandler, StaticInitializerHandler } from './Decorators/Initializable/Initializer';

/*************************************
 *   (Stability: 2 - Stable): Dependence Injection
 *************************************/
export { singleton } from './Decorators/DependencyInjection/singleton';
export { transit } from './Decorators/DependencyInjection/transit';
export { scoped } from './Decorators/DependencyInjection/scoped';

/*********************************************************************
 *   (Stability: 1 - Experimental): Getter Decorator: @once()
 *********************************************************************/
export { once } from '../decorators/Decorators/Once/Once';

/*********************************************************************
 *   (Stability: 1 - Experimental): Getter Decorator: @remember()
 *********************************************************************/
export { remember } from '../decorators/Decorators/Remember/Remember';

/*********************************************************************
 *   (Stability: 1 - Experimental): Class Decorator: @exclusive()
 *********************************************************************/
export { exclusive } from '../decorators/Decorators/Exclusive/exclusive';

/*********************************************************************
 *   (Stability: 1 - Experimental): Attributes
 *********************************************************************/
export { SingletonAttribute } from './Decorators/DependencyInjection/SingletonAttribute';
export { TransitAttribute } from './Decorators/DependencyInjection/TransitAttribute';
export { InjectAttribute } from './Decorators/DependencyInjection/InjectAttribute';
export { ScopedAttribute } from './Decorators/DependencyInjection/ScopedAttribute';
