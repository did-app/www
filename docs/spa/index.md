---
layout: doc
title: Client
abstract: How to integrate Single Page Apps with DID.app
---

Single Page Applications can use DID.app to fetch access tokens for authenticated users via two methods.

1. Have an API endpoint on your application backend fetch an id token.
2. Use PKCE to fetch the id token from the client.

Use option 1. if you are using cookie based sessions.
If using DID.app to send invite emails you will have to use option 1.

### Create Authentication Request

Redirect the End User to the authorization url: [https://auth.did.app/oidc/authorize](https://auth.did.app/oidc/authorize).
Provide the details of the authentication request as query parameters.

- client_id  
  (Required) Provided by DID.app and specific to your application.

- redirect_uri  
  (Required) An endpoint on your application that handles the authentication response.

- response_mode  
  How the code will be sent to the redirect endpoint.
  Recommended value for SPA applications is `fragment`, data will be encoded in the fragment of the `redirect_uri`.

- prompt  
  A value of `create` will display the "create an account" UI, any other value will show the "Sign in" UI.

- code_challenge  
  See section on [PKCE](#pkce)

- code_challenge_method  
  See section on [PKCE](#pkce)

### Extract the Authentication Response

A user that has clicked a magic link from DID.app is redirected back to your application with an authentication response.
The authentication response will be encoded in the fragment (the part after '#') of the redirect_uri set earlier.

Decode the authentication response and extract the code from it.

```js
let fragment = window.location.hash.substring(1)
let params = new URLSearchParams(fragment)
let code = params.get("code")
let error = params.get("error")

window.location.replace("#")
```

The final line is not required, but can make for a nicer user experience.
Replacing the location will remove the code from the browsers navigation bar.

### Fetch ID Token

#### Using backend endpoint

**The CLIENT_SECRET for you application must not be used in your front end.**
Send a request to your backend containg the code extracted in the previous section.
Call DID.app's token endpoint to exchange your code for an id token.

```js
const fetch = require("node-fetch");

const response = await fetch("https://auth.did.app/oidc/token", {
  method: "POST",
  body: `client_id=[CLIENT_ID]&client_secret=[CLIENT_SECRET]&code=${code}`
});
const data = response.json();
```

The data will contain your users information.

```json
{
  "userinfo": {
    "sub": "00000000-0000-0000-0000-000000000000",
    "email": "user@example",
    "email_verified": true
  },
  "id_token": "COMPACT JWT",
  "access_token": "COMPACT JWT"
}
```

The `sub` is the identifier of a user within your application.
It is intended to be used as the primary identifier of your user and does not change.

You should not rely on a users email being constant over time.

At this point authentication is complete.
It is up to your service to handle things from here.

For most applications this will involve starting a session for authenticated user.
How this is done will depend on the platform, or framework that you are using.

<a name="pkce"></a>
#### Proof Key for Code Exchange (PKCE)

Using PKCE allows your client application to retrieve the id token from a code directly, without exposing your client secret.
