---
layout: "doc"
title: "Core concepts"
abstract: "A glossary of key terms"
---


## Apps

An app on DID can be used by a web page executing in the browser, a native app on a mobile device, an API or multiple of the above.

An single app on DID is the context for which an end user presents the same identity.
Multiple services should belong to the same DID app if they appear to the end user as part of a single unified service.
For example: `example.com` and `blog.example.com`.

> **Naming things is hard.** What DID calls apps are referred to as Clients in the OAuth 2.0 specification and Relying Parties (RPs) in the OpenID Connect specification.
