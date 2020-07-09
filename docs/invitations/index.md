---
layout: "doc"
title: "Magic invitations"
abstract: "Send magic invitations to new or existing users."
---

## Use cases

Magic invitations frictionlessly authenticate your users and allow them to make use of your application immediately.
They can be sent to:

- Add a colleague to review your documents
- Share a photo with family members
- Invite a new user to start using your service.

## Steps

1. Trigger a user invitation
2. Identify user from link code

### Trigger a Magic Invitation

Magic invitations are triggered by a `POST` request to the authorization endpoint.

<!-- ```
curl https://secure.did.app/oidc/authorize
-d client_id=https://myapp.com/welcome
-d login_hint=bob@example.com
-d response_mode=fragment
-d template_name=invitation
-d data_from=Alice
-d data_to=Bob
``` -->

```js
let params = new URLSearchParams();
params.append("client_id", "https://myapp.com/welcome");
params.append("login_hint", "bob@example.com");
params.append("response_mode", "fragment");
params.append("template_name", "invitation");
params.append("data_from", "Alice");
params.append("data_to", "Bob");

fetch("http://secure.did.app/oidc/authorize", {
  method: "POST",
  body: params
});
```

An email will be sent to `bob@example.com` informing Bob that Alice has invited him to `myapp.com`.

### Identify user from link code

When Bob clicks the contained in the email they receive, they will be redirected back to `example.com`.
The redirect will an authentication response code in the url fragment:

```
https://myapp.com/welcome#code=CODE
```

Fetch a users information from the token endpoint using the code.

```js
let fragment = window.location.hash.substring(1);
let params = new URLSearchParams(fragment);
let code = params.get("code");

let params = new URLSearchParams();
params.append("grant_type", "authorization_code");
params.append("client_id", "https://myapp.com/welcome");
params.append("code", code);

fetch("http://secure.did.app/oidc/authorize", {
  method: "POST",
  body: params
});
```

The response from the token endpoint will contain the user information and an `id_token`.

```json
{
  "userinfo": {
    "email": "user@example",
    "email_verified": true
  },
  "id_token": "COMPACT JWT"
}
```

The `id_token` is signed by `did.app` and can be used by your application.
**You must not rely on unsigned user information when authenticating a user.**
