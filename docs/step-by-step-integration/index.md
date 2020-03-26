---
layout: "doc"
title: "Step-by-step integration"
---

[DID.app](/) integrates with your websites, APIs and apps via the OpenID Connect protocol.

Authenticating End Users takes two steps.

1. Redirect a user to DID.app with an authentication request from your application.
2. Fetch the user information from the authentication response.

### Create Authentication Request

Redirect the End User to the authorization url: [https://auth.did.app/oidc/authorize](https://auth.did.app/oidc/authorize).
Provide the details of the authentication request as query parameters.

- client_id  
  (Required) Provided by DID.app and specific to your application.

- redirect_uri  
  (Required) An endpoint on your application that handles the authentication response.

- response_mode  
  How the code will be sent to the redirect endpoint.
  Recommended value for applications with a server is `form_post`, data will be sent as the body of a `POST` request with content type `application/x-www-form-urlencoded`.

- prompt  
  A value of `create` will display the "create an account" UI, any other value will show the "Sign in" UI.

- state  
  An arbitrary value used to maintain state between the request and the callback, this value will be returned unmodified in the response.

#### Example

Using a form to create an authentication request.
<!-- Using the `get` method will add each input as a query parameter to the   -->

{% highlight html %}
<form action="https://auth.did.app/oidc/authorize" method="get">
  <input name="client_id" value="[CLIENT_ID]" type="hidden" />
  <input name="redirect_uri" value="[REDIRECT_URI]" type="hidden" />
  <input name="response_mode" value="form_post" type="hidden" />

  <button type="submit">Sign in</button>
</form>
{% endhighlight %}



<!-- <input name="scope" value="openid" type="hidden" />
<input name="response_type" value="code" type="hidden" /> -->

<!-- scope:** As OpenID Connect is built on top of OAuth 2.0, a scope value of openid is needed to indicate that we are using OpenID Connect.

**response_type:** This says we want to use the OAuth 2.0 Authorization Code flow.
This is by far the most commonly used flow it is suitable for all web and mobile applications. -->

<!-- **client_id** provided by DID.app and specific to your application.

**redirect_uri** Once the user has authenticated this is where to send the authentication response, it is an endpoint on your application.

**response_mode** How the code will be sent to the redirect endpoint.
A value of `form_post` indicates the data will be sent using a `POST` request and encoded as URI form parameters. -->


### Handle Authentication Response

Parse the authentication response, it will contain the following parameters:

- code  
  (Success Responses) A single use code that can be exchanged for user information.

- error  
  (Failure Responses) A string value error code, returned if unable to authenticate user or user cancels authentication.

- state  
  (All Responses) The state value sent with the authentication request.

Fetch user information associated with the code.
Send a `POST` request to the token endpoint. [https://auth.did.app/oidc/token](https://auth.did.app/oidc/token).
Provide the code and your applications details as form parameters.

- client_id  
  (Required) Provided by DID.app and specific to your application.

- client_secret  
  (Required) Provided by DID.app and specific to your application.

- code  
  (Required) Extracted from authentication response


```shell
curl https://auth.did.app/oidc/token \
  -d 'client_id=[CLIENT_ID]' \
  -d 'client_secret=[CLIENT_SECRET]' \
  -d 'code=[CODE]' \
```

The response body will contain your user information.

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
<!--
```ruby
Faraday.post(
  "https://auth.did.app/oidc/token",
  code: params[:code],
  grant_type: "authorization_code",
  redirect_uri: "http://myapp.demo/sign_in"
)
``` -->

The `sub` is the identifier of a user within your application.
It is intended to be used as the primary identifier of your user and does not change.

You should not rely on a users email being constant over time.

## Final steps

At this point authentication is complete.
It is up to your service to handle things from here.

For most applications this will involve starting a session for authenticated user.
How this is done will depend on the platform, or framework that you are using.
We have specific integration guides that cover this step for the following technologies.

- [Express & Node.js](/guides/express-nodejs-openid-connect-integration)
- [Phoenix & Elixir](/guides/phoenix-elixir-openid-connect-integration)

Can't find your preferred platform in our docs? There may already be OpenID Connect library for your platform:
A list of certified implementations is maintained at [https://openid.net/developers/certified/](https://openid.net/developers/certified/).

Visit our [Roadmap](https://did.nolt.io) to request an integration guide for a new platform.
