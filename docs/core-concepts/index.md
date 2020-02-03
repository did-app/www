---
layout: "doc"
title: "Core concepts"
abstract: "A glossary of key terms"
---

The core concepts in Kno are:

- [Spaces](#spaces)
- [Personas](#personas)

## Spaces

A Space is the context for which an end user presents the same identity.

Multiple sites, services and applications can be grouped together in a single Space.
If you have multiple services, but a user switching between them represents the same entity, group those services in a single Space.

## Personas

A Persona is the information about a user that is available to a particular Space.

Personas identify a user but only have meaning within the single Space.
The same user accessing two different spaces will have a separate Persona for each.
