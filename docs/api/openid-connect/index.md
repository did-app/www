---
layout: "doc"
title: "API - OpenID Connect"
---

The OpenID Connect (OIDC) protocol can be used to integrate with DID.app.

> If using an OIDC client library that supports provider discovery you do not need to implement these endpoints.
> Instead all configuration needed to interact with DID.app is available at the [discovery endpoint]({{ site.did_issuer }}/.well-known/openid-configuration).


## Authorization Endpoint

```
GET {{ site.auth_origin }}/oidc/authorize
```

This endpoint represents the the authorization endpoint described in [RFC6749 section 3.1.2](https://openid.net/specs/openid-connect-core-1_0.html#AuthorizationEndpoint).

The user agent of a client should be redirected to this URL to start the process of authenticating with DID.app.
See the documentation for supported parameters.

## Token Endpoint

```
POST {{ site.auth_origin }}/oidc/token
```

This endpoint represents the the authorization endpoint described in [RFC6749 section 3.1.3](https://openid.net/specs/openid-connect-core-1_0.html#TokenEndpoint).

To obtain an Access Token, an ID Token, and optionally a Refresh Token, the Relying Party sends a Token Request to the Token Endpoint to obtain a Token Response

## Userinfo Endpoint

```
GET {{ site.auth_origin }}/oidc/userinfo
```

This endpoint represents the the authorization endpoint described in [RFC6749 section 5.3](https://openid.net/specs/openid-connect-core-1_0.html#UserInfo).

The UserInfo Endpoint is a Protected Resource that returns Claims about the authenticated End-User.

## JWKs URL

```
GET {{ site.auth_origin }}/oidc/jwks
```

This endpoint returns the server JSON Web Keys(JWKs) used to sign the ID token that identifies an end user to a Relying Party applications.
