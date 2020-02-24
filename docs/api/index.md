---
layout: "doc"
title: "API reference"
abstract: "A complete overview of the DID API v0."
---

- [Endpoint URL](#endpoint-url)
- [Errors](#errors)

## Endpoint URL

The API is hosted at `auth.did.app`.

#### SSL encryption

All endpoints enforce SSL encryption, requests should be made using HTTPS.

```text
https://auth.did.app/
```

## Errors

Error responses are returned as a JSON object under the `error` key.
The error object will have the following keys.

- `id`: a unique identifier for this particular occurrence of the problem.
- `status`: the HTTP status code applicable to this problem, expressed as a string value.
- `code`: an application-specific error code, expressed as a string value.
- `title`: a short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
- `detail`: a human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.

<!-- These are copied from https://jsonapi.org/format/#error-objects -->

#### Example

```json
{
  "error": {
    "id": "7670138c-4792-4f7b-8a32-80de82d32bd8",
    "status": 403,
    "code": "token_declined",
    "title": "Access not granted for API token",
    "detail": "Client could not be authenticated"
  }
}
```
