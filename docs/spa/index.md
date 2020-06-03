---
layout: doc
title: SPA integration guide
abstract: How to integrate Single Page Webapps with DID.app
---

Single Page WebApps (SPAs) can use DID.app can authenticate users via OpenID Connect.
Authenticating End Users takes two steps.

1. Redirect a user to DID.app with an authentication request from your application.
2. Fetch the user information from the authentication response.

Fetching user information for authenticated users can be achieved via two methods.

1. Have an API endpoint on your application backend fetch an id token.
2. Use PKCE and fetch the id token from within the web app.

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

### Handle the Authentication Response

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

### Fetch User Data

#### Option 1. Using backend endpoint

**The CLIENT_SECRET for you application must not be used in your front end.**
Send a request to your backend containg the code extracted in the previous section.
Call DID.app's token endpoint to exchange your code for an id token.

```js
const fetch = require("node-fetch");

let response = await fetch("https://auth.did.app/oidc/token", {
  method: "POST",
  body: `client_id=[CLIENT_ID]&client_secret=[CLIENT_SECRET]&code=${code}`
});
let data = response.json();
```

The data will contain your users information.

<a name="pkce"></a>
#### Option 2. Proof Key for Code Exchange (PKCE)

Using PKCE allows your client application to retrieve the id token from a code directly, without exposing your client secret.
To use PKCE you need to send a `code_challenge` with your authorization request.

Generate a code challenge and code verifier.

See [code samples](#generating-pkce) at the end for implementation of the functions used here.

```js
let codeVerifier = randomUrlBase64(32)
let codeChallenge = await hashUrlBase64(codeVerifier)
```

The code challenge and code challenge method is sent with the authorization request.
The code challenge method is `sha256`, it is the only value currently supported.

Now your client can make a call to the token endpoint, instead of sending a client secret, it instead sends the code verifer.

```js
let response = await fetch("https://auth.did.app/oidc/token", {
  method: "POST",
  body: `client_id=[CLIENT_ID]&code_verifier=${code_verifier}&code=${code}`
});
let data = response.json();
```

The data will contain your users information.

### Using user information

In both cases the returned payload will contain an id_token, access_token and userinfo.

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

For backend applications this will involve starting a session for the authenticated user.
How this is done will depend on the platform, or framework that you are using.

<a name="generating-pkce"></a>
### Generating code challenge and verifier

These functions make use of the web crypto API which is [supported by 95% of browsers](https://caniuse.com/#feat=cryptography)

```js
function randomUrlBase64(bytes) {
  let seed = crypto.getRandomValues(new Uint8Array(32));
  return arrayBufferToUrlBase64(seed);
}

async function hashUrlBase64(string) {
  let hash = await crypto.subtle.digest("SHA-256", strToUint8(string));
  return arrayBufferToUrlBase64(hash);
}

// Binary Utilities

function arrayBufferToString(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return binary;
}

function arrayBufferToBase64(buffer) {
  return window.btoa(arrayBufferToString(buffer));
}

function arrayBufferToUrlBase64(buffer) {
  return arrayBufferToBase64(buffer)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function strToUint8(str) {
  return new TextEncoder().encode(str);
}
```
