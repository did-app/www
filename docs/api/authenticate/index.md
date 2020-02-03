---
layout: "doc"
title: "API - Authenticate"
---

## Verify Token

```
POST /authenticate
```

Return the Persona details associated with a token.

#### Example

```bash
curl -H 'authorization: Bearer [api-token]'
     -d '{"token": "[kno-token]"}'
```

### Response

Response code for success is `200`.

#### Example

```json
{
  "persona": {
    "id": "0f86e3a1-15b2-4a18-8da5-e4421d85071c"
  }
}
```
