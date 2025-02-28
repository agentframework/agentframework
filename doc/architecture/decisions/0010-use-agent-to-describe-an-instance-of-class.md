# 10. use agent to describe an instance of class

Date: 2021-04-15

## Status

Accepted

## Context

At very beginning the Domain API to get an instance of class is called `Domain.getAgent`.
But later I was confused and change to `Domain.getInstance`.
Now I realized this mistake and change back to `getAgent` again.

## Decision

An instance of class should call Agent in AOP
The type of agent (class) should call AgentType

## Consequences

Some unit tests need rewrite.
