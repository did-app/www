---
layout: doc
title: "Phoenix Integration Guide"
abstract: ""
---

The [Phoenix install guide](https://hexdocs.pm/phoenix/installation.html#content) can help you install Phoenix and Elixir.

## New Phoenix project

Start a new Phoenix project.

```bash
mix phx.new my_app --no-ecto --no-webpack
cd my_app
```

_`--no-ecto --no-webpack` We don't need a database or JS bundle for this example_

Add the `openid_connect` package to `mix.exs`. Don't forget to run `mix deps.get`.

```elixir
defp deps do
  [
    {:openid_connect, "~> 0.2.2"}
  ]
end
```

## Supervise the OpenID Connect worker

Add `OpenIDConnect.Worker` to list of children in `lib/my_app/application.ex`.

```elixir
use Application

def start(_type, _args) do
  children = [
    {OpenIDConnect.Worker, [[did: did_config()]]},
    # ...
  ]

  opts = [strategy: :one_for_one, name: MyNotes.Supervisor]
  Supervisor.start_link(children, opts)
end

defp did_config() do
  client_id = System,get_env("DID_CLIENT_ID")
  client_secret = System,get_env("DID_CLIENT_SECRET")

  [
    discovery_document_uri: "https://did.app/.well-known/openid-configuration",
    client_id: client_id,
    client_secret: client_secret,
    redirect_uri: "https://localhost:4000/session/callback",
    response_type: "code",
    scope: "openid"
  ]
end
```

These are the appropriate OpenID Connect options for a server rendered application.
The `client_id` and `client_secret` will be provided by DID when you create an application.

## Create sign in actions

Signing in, or up, using the OpenID connect flow requires two endpoints.

One endpoint redirects the user to the OpenID provider (in this case DID.app) to authenticate themselves.
And a callback where the result of authenticating is handled.

We will add both of these in a session controller.

```elixir
defmodule MyNotesWeb.SessionController do
  use MyNotesWeb, :controller

  def authenticate(conn, _params) do
    conn
    |> redirect(external: OpenIDConnect.authorization_uri(:did))
  end

  def callback(conn, %{"code" => code}) do
    {:ok, tokens} = OpenIDConnect.fetch_tokens(:did, %{code: code})
    {:ok, claims} = OpenIDConnect.verify(:did, tokens["id_token"])
    user_id = claims["sub"]

    conn
    |> put_session(:user_id, user_id)
    |> redirect(to: "/notes")
  end
end
```

Both of these actions need to be added to the router .

```elixir
scope "/", HelloWeb do
  pipe_through :browser

  post "/session/authenticate", SessionController, :authenticate
  get "/session/callback", SessionController, :callback
end
```

## Display status to the user

To let our guest users sign in from any page we will add a button to the app layout.

Edit the template in `lib/my_notes_web/templates/layout/app.html.eex` with the new code.

```eex
<%= if Plug.Conn.get_session(conn, :user_id) do %>
  <-- show the user something about their account -->
<% else %>
  <%= link "Sign in", to: Routes.session_path(@conn, :authenticate) %>
<% end %>
```

<!-- ## Try out sign in/out

At this point you should be able to start you application.

```shell
mix phx.server
```

visit [localhost:4000](http://localhost:4000) and try signing in and out.
At this point our application can't do any more than this.

![screenshot of the sign in page](TODO) -->

## Setup the App on DID

You will need a DID account. [Sign up]({{ site.auth_origin }}) to create one now.

After signing up, you will be directed to setup your first app.
_Because we will run on localhost we need to use test app, select test mode._

![Screenshot of creating an app on DID](/assets/images/create-app-screenshot.png)

After setting the details for the app, copy the client id and secret for use in our application.

## Try it out

```bash
DID_CLIENT_ID=test_abc DID_CLIENT_SECRET=test_abcdef mix phx.server
```

Screenshot as a share image

At this point we have a working notes application.
Try it out by visiting [localhost:4000](http://localhost:4000/notes).
If you have had any trouble you can pull the finished example [here](https://github.com/did-app/did-elixir/tree/master/examples/phoenix_integration)

![screenshot of the list notes page](https://thepracticaldev.s3.amazonaws.com/i/ghvkpqniywro2we7di2a.png)

If you have any further questions or want to find out more about DID, visit [did.app](https://did.app) or contact us at [team@did.app](mailto:team@did.app?subject=DID-Elixir%20question).
