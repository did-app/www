---
layout: "doc"
title: "User invitations"
abstract: "Send magic invitations to new or existing users."
---

## Use cases

Magic invitations frictionlessly authenticate your users and allow them to make use of your application immediately.
They can be sent to:

- Add a colleague to review your documents
- Share a photo with family members
- Invite a new user to start using your service.

## Steps

1. Create a template for you invitation email.
2. Send a user invitation
3. Verify link code
4. Grant user access to your service.

### Triggering a User Invitation

A user invitation is any sign in email not requested by the owner of the email address.
Emails are triggered by the authorization API endpoint as described in [single page app integration](/docs/single-page-app-integration).

It is possible to use this API to trigger sending a normal sign-in email,
however this is not appropriate in most cases as the recipient of the email will lack the required context.
One situation it is suitable, is when onboarding users in person to internal applications.

In most cases you will want to send messages using a custom templates, see the next section.

##### Setting up templates

Each team on DID.app can be set up with access to a mail server, on postmark.com, that will contain the templates for their applications.
You will need to be on an enterprise plan and contact team@did.app to set this up.

Your templates will need to interpolate a link using the `sign_up_url` variable available in the template.
It can also interpolate any `data_` values sent in the authentication request.

Template with alias `user-invitation`

```html
Hi {{inviter_name}} would like to invite you to Our Service.
<a href="{{sign_in_url}}">Sign in here</a>

Thanks
```

To trigger an invite using this template make the call below.

```sh
curl https://auth.did.app/oidc/authorize \
  -d client_id=test_123456 \
  -d redirect_uri=http://our-site.test/sign-in \
  -d login_hint=new_user@example.test \
  -d response_mode=fragment \
  -d template_alias=user-invitation \
  -d data_inviter_name=Sarah
```

### Handling Authorization Responses

One the user clicks the link in the email they will be directed to your redirect_uri,
this redirect will contain the authorization response in the format specified by the `response_mode` parameter.

From this point the invitation process is the same as any other sign in.

Follow the advice in the [step by step guide](/docs/step-by-step-integration) for MVC/backend applications.
Follow the advice in the [single page app guide](/docs/single-page-app-integration) for SPAs.

### Correlation to invites

It is recommended that the email_address is used to correlate any information about the user gathered at invite time.
This is preferred over a correlation to specific invites, because an email address might be used for invites mores than once before an account is created.
Having two users, from two separate invites, with the same email could lead to confusion as only one will become active we the invited user completes account creation.

## OpenID Connect

The DID.app magic invitation flow uses the OpenID Connect (OIDC) protocol, which is an extension to OAuth 2.0.
This guide does require any knowledge of those protocols however you may find OIDC client libraries helpful for your integration.
