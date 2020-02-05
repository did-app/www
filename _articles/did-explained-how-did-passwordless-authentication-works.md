---
layout: wiki-post
abstract: "DID Explained.  A guide to how DID passwordless authentiation works."
sitemap:
lastmod: 2020-01-15
---

DID authenticates users independently and passes approval to the requesting website in order to grant the user access.  This method of authentication is known as [Open ID](https://openid.net/).

DID uses two methods of authenticating a user:  email and public key. Both methods use the [Web Cryptography API](https://www.w3.org/TR/2017/REC-WebCryptoAPI-20170126/) which allows applications to perform cryptographic operations in the browser therefore allowing DID to authenticate users without passwords.

## Open ID Connect

[Open ID Connect](https://openid.net/connect/) is a simple identity layer on top of the [OAuth 2.0 protocol](https://oauth.net/2/) and allows applications to exchange information about authenticated sessions and end-users.

This diagram explains how Open ID Connect works:

![How DID works: Open ID Connect Integration](/assets/images/how-did-works/how-did-works-open-id-connect-integration.png)

Let’s look in more detail at step four of the diagram above.  This is the step where DID authenticates the user.

When a user presents themselves at DID for the first time, the user’s browser generates a public and private key.  DID asks for the user’s email address this is sent to DID along with the user’s new public key.  DID is then able to generate a cryptographic ‘challenge’ from the user’s public key in the form of a code that only the user (with their private key) can solve.  

A link, including this challenge, is sent to the user’s email address.  The user retrieves it and clicks.  The ‘challenge’ code is solved by the user’s private key and the answer is communicated back to DID which then verifies the challenge is solved.

Finally, DID sends another unique code back to the browser which the requesting website uses to grant the user access.

This diagram explains how DID authenticates a user with their email address:

![How DID works: Signing In With Email](/assets/images/how-did-works/how-did-works-signing-in-with-email.png)

The second time a user wants to authenticate with DID, they can authenticate with the existing keys they already have on their device.

This diagram shows the simpler process of authenticating with DID using existing keys:

![How DID works: Signing In With Public Key](/assets/images/how-did-works/how-did-works-signing-in-with-public-key.png)

Using the methods outlined above, DID verifies a user is who they say they are by ownership of an email address and ownership of a device.

Every time a user signs in with DID, the public key is used to generate a challenge only that specific user can solve with their private key and once the challenge is solved it expires.

The result is a very fast and secure sign in process.

To summarise how DID works into one sentence:

**DID uses cryptography to authenticate users and communicates with the website to grant access to the user.**

