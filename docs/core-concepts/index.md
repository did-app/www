---
layout: "doc"
title: "Core concepts"
abstract: "A glossary of key terms"
---

## OpenID Connect

[DID.app](/) integrates with your websites, APIs and apps via the OpenID Connect protocol.

> OpenID Connect is the widely used, industry-standard protocol for authentication.
> It is an extension to the OAuth 2.0 framework.
>
> The standard is controlled by the [OpenID Foundation](https://openid.net/)


Three parties are involved when using OpenID Connect to authenticate.

- **DID.app**, the OpenID provider that is able to identify End Users.
- **Your application**, the Relying Party that is delegating authentication of End Users to an OpenID Provider.
- **End User**, Someone who would like to use the service provided by your application.

_Your application could also be a website or API_

The OpenID Connect protocol is a two step process.
First a user authenticates with an OpenID Provider and is issued with a code.
Second the user submits the code to an application which verifies it with the OpenID Provider to identify the user.

<!-- To prevent bad people the code. is
for a specific service, can be redeemed only once and must be redeemed within a given time period, redirect_uri can only be one of the ones set up in your app -->

## Apps

An app on DID can be used by a web page executing in the browser, a native app on a mobile device, an API or multiple of the above.

An single app on DID is the context for which an end user presents the same identity.
Multiple services should belong to the same DID app if they appear to the end user as part of a single unified service.
For example: `example.com` and `blog.example.com`.

> **Naming things is hard.** What DID calls apps are referred to as Clients in the OAuth 2.0 specification and Relying Parties (RPs) in the OpenID Connect specification.
