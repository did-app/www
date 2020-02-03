---
layout: "doc"
title: "Getting started"
sitemap:
  priority: 1.0
---

This guide will explain how to set up authentication for a web application.

### Test tokens

If you want to follow this guide without setting up an account, use the test tokens and skip to [step 2](#2-embed-client-snippet).

These test tokens work for sites that are served from `localhost`, on any port.

- site_token: `site_UITYJw8kQJilzVnux5VOPw`
- API_token: `API_AAAAAgDOxdmUqKpE9rw82Jj0Y6DM`

## 1. Create tokens

From your [dashboard]({{site.admin_origin}}/sign_in) select "create new space".

### Set up Space

You will be asked to provide a **name** for the Space and a **domain**.
The name is how a user identifies which service they are signing in too.
The domain is the domain of the site you are setting up authentication for.


Once done, you can see the details of your Space including a site token.
Make note of your site token.

### Generate API token

Next select "Generate API token".

**Important, the API token can only be copied when created**.
If you loose access to your API token you will have to generate a new one.


## 2. Embed client snippet

Add the following snippet to page to show a sign in button:


```html
<form action="/sign-in" method="POST">
  <script
    src="https://mydid.app/pass.js"
    data-site="[site-token]">
  </script>
  <button type="submit">Sign in</button>
</form>
```

- *Replace `[site-token]` with the site token you copied from the previous section.*

When a user clicks the submit button, DID will authenticate them.
Once complete, a token will be added to a `knoToken` field in the form and the form submitted to the server.

<!-- Have two buttons in the same place for sign in create account -->

## 3 Fetch persona details

Extract the submitted token from the form, in part 2.
Request the associated persona details from the DID server.

```bash
curl "https://api.trykno.app/v0/authenticate" \
  -u [api-token]: \
  -d token=[kno-token]
```

- *Replace api-token with your own token.*
- *Replace kno-token with the token submitted in the form.*

This will return the available data about the user.

```json
{
  "persona": {
    "id": "[persona-id]"
  }
}
```

## 4. Add Persona id to session

Add the `persona_id` to the session, so users don't have to authenticate for every request.
How this is done depends on the framework that you are using.

#### Ruby

```ruby
def sign_in(persona_id)
  session[:current_user_id] = persona_id
  redirect_to root_url
end
```
<!-- ```ruby
class LoginsController < ApplicationController
  # "Create" a login, aka "log the user in"
  def create
    if user = User.authenticate(params[:username], params[:password])
      # Save the user ID in the session so it can be used in
      # subsequent requests
      session[:current_user_id] = user.id
      redirect_to root_url
    end
  end
end
``` -->

#### Elixir

```elixir
def sign_in(conn, persona_id) do
  conn
  |> put_session(:persona_id, persona_id)
  |> redirect(to: "/notes")
end
```


**Note:** the application can do what ever it likes with the persona information.
It does not have to create a user session, but that is the most convenient for many types of application.
