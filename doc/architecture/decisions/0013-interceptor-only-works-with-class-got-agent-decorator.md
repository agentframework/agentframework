# 13. interceptor only works with class got @agent decorator

Date: 2021-10-20

## Status

Accepted

## Context

For code like below. `Base` class don't have @agent decorator. So `Super` class need do deep search to lookup all interceptors in its prototype chain. this search impact performance a lot.

```typescript
class Base {
	@decorateMember({
		interceptor: {
		  intercept() {
		    //....
		  }
		}
	})
	test1() {
		//....
	}
}

@agent()
class Super extends Base {
	@decorateMember({
		interceptor: {
			intercept() {
				//....
			}
		}
	})
	test2() {
	  //....
	}
}

```

## Decision

In current version "2.x". `test1` will not intercepted, only `test2` will be intercepted.

## Consequences

Interceptors in base class got no effects.
