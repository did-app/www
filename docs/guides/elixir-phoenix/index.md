---
layout: doc
---

TODO look into the relative merit of SSO authentication OAuth as keys words

_This guide requires Phoenix and Elixir.
The [Phoenix install guide](https://hexdocs.pm/phoenix/installation.html#content) can help you get both of these set up._

## Setup Phoenix Project

We are going to build a note taking app called `my_notes`.
Using [DID](https://did.app) will will show how to authenticate users and protect their notes.

```sh
mix phx.new my_notes
cd my_notes
```

We will use the `openid_connect` package that is available on [hex.pm](https://hex.pm/packages/openid_connect).

Open up `mix.exs` and add HTTPoison and Jason as dependencies.

```elixir
defp deps do
  [
    # existing dependencies
    {:openid_connect, "~> 0.2.2"}
  ]
end
```

Then run `mix deps.get` to pull the new dependencies.

## Create an App on DID

You will need to create an app with DID.
Once you have signed up to DID.app you will be guided to create your first app.

Choose a name for your app, in our case My Notes.
And set the origin, for our development project this will be `http://localhost:4000`.
Finally we will want to select that this is a test application. Or not select live.

# TODO picture of create app

Once the app is created you can find the `client_id` and `client_secret` we will need these later.

> _[Sign up now]() and create your first app._

## Configure the OpenIDConnect Worker

Next add the `OpenIDConnect.Worker` to your phoenix app’s supervisor along with config for DID.

```elixir

use Application

def start(_type, _args) do
  children = [
    MyNotes.Repo,
    MyNotesWeb.Endpoint,
    Supervisor.Spec.worker(OpenIDConnect.Worker, [[did: did_config()]]),
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
    redirect_uri: "https://localhost:4000/sign_in",
    response_type: "code",
    scope: "openid"
  ]
end
```

## Display sign in/out buttons

Add the following code to `lib/my_notes_web/templates/layout/app.html.eex`, so that a user can sign in or out from any page.

```eex
<%= if authenticated?(@conn) do %>
  <%= link "Sign out", to: Routes.session_path(@conn, :sign_out) %>
<% else %>
  <%= link "Sign in", to: Routes.session_path(@conn, :sign_in) %>
<% end %>
```

To unauthenticated users we show a link to sign in,
and authenticated users a link to sign out is shown.

The `authenticated?` function is a helper that we define in `lib/my_notes_web/views/layout_view.ex`.

```elixir
def authenticated?(conn) do
  case Plug.Conn.get_session(conn, :user_id) do
    user_id when is_binary(user_id) ->
      true

    nil ->
      false
  end
end
```

## Handle sign in/out actions

In `lib/my_notes_web/router.ex` add the two routes to the top level `"/"` scope pointing to a `SessionController`.

```elixir
scope "/", HelloWeb do
  pipe_through :browser

  get "/", PageController, :index
  post "/sign-in", SessionController, :sign_in
  get "/sign-out", SessionController, :sign_out
end
```

Create a session controller to handle updating the users session when a user signs in or out.
Add to `lib/my_notes_web/controllers/session_controller.ex`.

```elixir
defmodule MyNotesWeb.SessionController do
  use MyNotesWeb, :controller


  def sign_in(conn, %{"code" => code}) do
    {:ok, tokens} = OpenIDConnect.fetch_tokens(:google, %{code: params["code"]})
    {:ok, claims} = OpenIDConnect.verify(:google, tokens["id_token"])

    conn
    |> put_session(:user_id, claims["sub"])
    |> redirect(to: "/notes")
  end

  def sign_out(conn, _params) do
    conn
    |> clear_session()
    # TODO redirect to sign out endpoint
    |> redirect(to: "/")
  end
end
```

To sign in we first fetch the tokens associated with the code that the user as sent.
The id_token is a signed JWT that contains all the information about our user.
It should always be verified and the claims extracted:

Once authenticated, the session controller adds the user_id to the session.

## Try out sign in/out

At this point you should be able to start you application.

```shell
mix phx.server
```

visit [localhost:4000](http://localhost:4000) and try signing in and out.
At this point our application can't do any more than this.

![screenshot of the sign in page](TODO)

## Saving notes in the database

Now is the time to add some notes to our notes application.
Add a migration to create a notes table so that the application can save notes in the database.

```shell
mix ecto.gen.migration create_notes
```

In the generated file at `/priv/repo/migrations/[timestamp]_create_notes.exs` create a table for notes with a title content user_id and timestamps.
The timestamps are used so a user can see the notes in the order they created them.

```elixir
defmodule MyNotes.Repo.Migrations.CreateNotes do
  use Ecto.Migration

  def change do
    create table(:notes) do
      add :user_id, :binary_id, null: false
      add :title, :text, null: false
      add :content, :text, null: false
      timestamps(type: :utc_datetime)
    end

    create index(:notes, :user_id)
  end
end
```

Then run `mix ecto.migrate` to apply the migration to your database.
Before running this for the first time you will need to run `mix ecto.create`.

Create the file `lib/my_notes/note.ex` in which we will add the Ecto model for accessing notes in the database.

```elixir
defmodule MyNotes.Note do
  use Ecto.Schema

  schema "notes" do
    field :user_id, :binary_id
    field :title, :string
    field :content, :string
    timestamps(type: :utc_datetime)
  end

  def changeset(note, attrs) do
    import Ecto.Changeset

    note
    |> cast(attrs, [:title, :content])
    |> validate_required([:title, :content])
  end
end
```

Add the logic for managing notes to `lib/my_notes.ex` so that we can use a clean interface to the core logic from a notes controller.

```elixir
defmodule MyNotes do

  import Ecto.Query, warn: false

  alias MyNotes.Note
  alias MyNotes.Repo

  @doc """
  Returns the list of notes for a given persona id.
  """
  def list_notes(user_id) when is_binary(user_id) do
    from(n in Note, where: n.user_id == ^user_id, order_by: :inserted_at)
    |> Repo.all()
  end

  @doc """
  Gets a single note owned by a persona.
  """
  def get_note!(id, user_id), do: Repo.get_by!(Note, id: id, user_id: user_id)

  @doc """
  Creates a note for a persona.
  """
  def create_note(attrs, user_id) do
    %Note{user_id: user_id}
    |> Note.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates an existing note.
  """
  def update_note(%Note{} = note, attrs) do
    note
    |> Note.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Note.
  """
  def delete_note(%Note{} = note) do
    Repo.delete(note)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking note changes.
  """
  def change_note(%Note{} = note) do
    Note.changeset(note, %{})
  end
end
```

Once a user has signed in they can Create Read Update & Delete (CRUD) notes that belong to them.
The `MyNotes` module provides an interface for all these actions.

## Create a notes controller and views

Now it's time to create a controller for users to work with their notes.
This will live in `lib/my_notes_web/controllers/note_controller.ex`.

```elixir
defmodule MyNotesWeb.NoteController do
  use MyNotesWeb, :controller

  def index(conn, _params) do
    %{user_id: user_id} = conn.assigns

    notes = MyNotes.list_notes(user_id)
    render(conn, "index.html", notes: notes)
  end

  def new(conn, _params) do
    %{user_id: user_id} = conn.assigns

    changeset = MyNotes.change_note(%MyNotes.Note{user_id: user_id})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"note" => note_params}) do
    %{user_id: user_id} = conn.assigns

    case MyNotes.create_note(note_params, user_id) do
      {:ok, note} ->
        conn
        |> put_flash(:info, "Note created successfully.")
        |> redirect(to: Routes.note_path(conn, :show, note))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    %{user_id: user_id} = conn.assigns

    note = MyNotes.get_note!(id, user_id)
    render(conn, "show.html", note: note)
  end

  def edit(conn, %{"id" => id}) do
    %{user_id: user_id} = conn.assigns

    note = MyNotes.get_note!(id, user_id)
    changeset = MyNotes.change_note(note)
    render(conn, "edit.html", note: note, changeset: changeset)
  end

  def update(conn, %{"id" => id, "note" => note_params}) do
    %{user_id: user_id} = conn.assigns

    note = MyNotes.get_note!(id, user_id)

    case MyNotes.update_note(note, note_params) do
      {:ok, note} ->
        conn
        |> put_flash(:info, "Note updated successfully.")
        |> redirect(to: Routes.note_path(conn, :show, note))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", note: note, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    %{user_id: user_id} = conn.assigns

    note = MyNotes.get_note!(id, user_id)
    {:ok, _note} = MyNotes.delete_note(note)

    conn
    |> put_flash(:info, "Note deleted successfully.")
    |> redirect(to: Routes.note_path(conn, :index))
  end
end
```

For each action the controller uses the business logic defined in the previous section.
Every action that needs a user_id extracts it from the assign property of the conn,
relying on authentication to be handled at a before.

We will ensure that authentication is always handled by writing a plug that will be added to the pipeline before the controller is called.

Add a view module in `lib/my_notes_web/views/note_view.ex` to generate the `render` functions used in this controller.

```elixir
defmodule MyNotesWeb.NoteView do
  use MyNotesWeb, :view
end
```

No extra functionallity is needed in this view, so all that remains is to create the following templates:

_lib/my_notes_web/templates/note/index.html.eex_

```eex
<h1>Your Notes</h1>

<table>
  <thead>
    <tr>
      <th>Title</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
  <%= for note <- @notes do %>
    <tr>
      <td><%= note.title %></td>
      <td>
        <%= link "Show", to: Routes.note_path(@conn, :show, note) %> &middot;
        <%= link "Edit", to: Routes.note_path(@conn, :edit, note) %> &middot;
        <%= link "Delete", to: Routes.note_path(@conn, :delete, note), method: :delete, data: [confirm: "Are you sure?"] %>
      </td>
    </tr>
  <% end %>
  </tbody>
</table>

<span><%= link "Create Note", to: Routes.note_path(@conn, :new) %></span>
```

_lib/my_notes_web/templates/note/form.html.eex_

```eex
<%= form_for @changeset, @action, fn f -> %>
  <%= if @changeset.action do %>
    <div class="alert alert-danger">
      <p>Oops, something went wrong! Please check the errors below.</p>
    </div>
  <% end %>

  <%= label f, :title %>
  <%= text_input f, :title %>
  <%= error_tag f, :title %>

  <%= label f, :content %>
  <%= textarea f, :content, rows: "20" %>
  <%= error_tag f, :content %>

  <div>
    <%= submit "Save" %>
  </div>
<% end %>
```

_lib/my_notes_web/templates/note/new.html.eex_

```eex
<h1>New Note</h1>

<%= render "form.html", Map.put(assigns, :action, Routes.note_path(@conn, :create)) %>

<span><%= link "Back", to: Routes.note_path(@conn, :index) %></span>
```

_lib/my_notes_web/templates/note/show.html.eex_

```eex
<h2><%= @note.title %></h2>

<div class="preformatted">
  <%= @note.content %>
</div>

<hr />

<span><%= link "Edit", to: Routes.note_path(@conn, :edit, @note) %></span> &middot;
<span><%= link "Back", to: Routes.note_path(@conn, :index) %></span>
```

_lib/my_notes_web/templates/note/edit.html.eex_

```eex
<h1>Edit Note</h1>

<%= render "form.html", Map.put(assigns, :action, Routes.note_path(@conn, :update, @note)) %>

<span><%= link "Back", to: Routes.note_path(@conn, :index) %></span>

```

## Protecting note routes

Add the following code to `lib/my_notes_web/router.ex`.

```elixir
alias MyNotesWeb.Router.Helpers, as: Routes

scope "/notes", MyNotesWeb do
  pipe_through [:browser, :ensure_authenticated]

  resources "/", NoteController
end

def ensure_authenticated(conn, _) do
  case get_session(conn, :user_id) do
    nil ->
      conn
      |> put_flash(:error, "You don't have permission to access that page")
      |> redirect(to: Routes.page_path(conn, :index))
      |> halt()

    user_id when is_binary(user_id) ->
      conn
      |> assign(:user_id, user_id)
  end
end
```

All of the CRUD actions are defined by the `resource` macro.

By adding `ensure_authenticated` to the `pipe_through` section every client request is first passed through this function.
This `ensure_authenticated` plug checks that the session contains a user_id.
For unauthenticated sessions the request is redirected with an error and halted.
If a user_id was present it is added as an assign property on the plug, the request will then continue up the pipeline to be handled by the notes controller.

## Try it out

At this point we have a working notes application.
Try it out by visiting [localhost:4000](http://localhost:4000/notes).
If you have had any trouble you can pull the finished example [here](https://github.com/did-app/did-elixir/tree/master/examples/phoenix_integration)

![screenshot of the list notes page](https://thepracticaldev.s3.amazonaws.com/i/ghvkpqniywro2we7di2a.png)

If you have any further questions or want to find out more about DID, visit [did.app](https://did.app) or contact us at [team@did.app](mailto:team@did.app?subject=DID-Elixir%20question).
