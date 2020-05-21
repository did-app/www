---
layout: doc
title: DID SPA
---

This library requires JS and is designed to integrate with React Vue Svelte or other client applications.
If you control a server see those guides

## Quick start

```html
<script src="https://did.app/spa.js" async defer></script>
<meta name="did_client_id" content="YOUR_CLIENT_ID" />
```

Setting async is a fallback for the defer unsupported
because of that still have an onload function

```js
const { email, accessToken } = await DID.refresh();
if (credentials) {
  console.log(credentials.email);
} else {
  const { credentials } = await DID.authenticate();
  console.log(credentials.email);
}
```

Do not save the Access token in localStorage. Always request fresh

Need a combined function

Need a logout function

```js
import { SPA } from "did";
```

## Add Account

```html

```

## Problem space

- Inconsistent guidance on where to store JWT's, how long their life should live

## Solution space

- Handle sessions

```js
{token, error} = await DID.authenticate()
// Need to accept confirmation code

token = {
  "email": emailAddress,
  "email_verified": true,
  "aud": "client_id",
  "iss": "https://did.app",
  "iat"
  "code length":
}

{token, error} = await DID.SPA.refresh()

function authenticate() {
  const email = await email()
  // Waits for response, because
  const auth = DID.sendChallenge(emailAddress)
  const code = await code()
  {token, error, retries} = auth.submitCode(code)
  if (error && retries == 0) {
    return {error}
  }
}

```

DID Remote
DID Biometrics
