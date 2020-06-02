---
layout: "doc"
title: "User Invitations"
abstract: ""
---

User Invitations can be used in applications that are invite-only or in applications that have an open sign-up process.

Using DID.app for user invitations can be used to grow your customer base.
They can also be used for onboarding employee's and collaborators to private applications.

### Triggering a User Invitation

`POST /api/invite`

```json
{
  "client_id": "[CLIENT_ID]",
  "client_secret": "[CLIENT_SECRET]",
  "redirect_uri": "https://myapp.test/welcome",
  "response_mode": "fragment | form_post | query",
  "email_address": "bonny@example.com",
  "template_alias": "invite_to_myapp",
  "template_data": {
    "custom_value": "foo"
  }
}
```

A `response_mode` of `fragment` is recommended for JavaScript client applications.
a `response_mode` of `form_post` is recommended for applications with server managed sessions. e.g. MVC frameworks.

This call will return `200` and an empty JSON response `{}`.

#### Correlation to invites

It is recommended that the email_address is used to correlate any information about the user gathered at invite time.
This is preferred over a correlation to specific invites, because an email address might be used for invites mores than once before an account is created.
Having two users, from two separate invites, with the same email could lead to confusion as only one will become active we the invited user completes account creation.

#### Templates

We manage our templates in postmark.
How do we allow other users to access postmark. Send a message to post mark.

### Receiving an authorzation Code

Clicking the link contained in the email will direct users to did.app the link will be checked for validity, before a one time code is generated and the user redirected to the redirect_uri with the authorization code.

<!-- #### JavaScript client applications -->

Fetch the authorization code.

```js
let fragment = window.location.hash.substring(1)
let params = new URLSearchParams(fragment)
let code = params.get("code")
let error = params.get("error")

window.location.replace("#")
```

The call to replace the location will remove the code from the browsers navigation bar.
It is not required but can make for a nicer user experience.

### Handling errors

In the case the link has expired, or previously been used there will not be a code present but standard error code.
<!--
### Fetching tokens

```js
let response = await fetch("https://did.app/api/token", {
  method: "POST",
  headers: {"content-type": "application/json"},
  body: JSON.stringify({"code": code, })
})
let data = await response.json()

let accessToken = data.access_token
let refreshToken = data.refresh_token
```

The access token is signed by did.app and can be validated by your backend to authorize access to protected resources.
The access token **SHOULD NOT** be stored by the browser, for example in localStorage. It should only be kept as an object/variable in Javascript memory.

Note the refresh token is a split token, it will only work from the same browser, so can be stored indefinitely in the browsers localStorage.

### Session management

By default, access tokens have a lifetime of 60 minutes.

Silent with the login hint. needed for the delete to logout

#### Logout

To logout delete the `refresh_token` from storage and delete the `access_token`.
If the `access_token` is only a JavaScript value forcing a page refresh will also remove any reference to the access_token

### Terms

Open/Close or Public/Private for applications that users can sign up to themselves
https://auth0.com/docs/design/creating-invite-only-applications
auth0 uses the term self service provisioning.



 -->
