---
layout: wiki-post
abstract: "DID Explained.  A guide to how DID passwordless authentiation works."
sitemap:
lastmod: 2020-01-15
---

DID authenticates users and passes approval to the requesting website in order to grant the user access.  This method of authentication is known as [Open ID Connect](https://openid.net/).

DID uses two methods of authenticating a user:  email and public key. Both methods use the [Web Cryptography API](https://www.w3.org/TR/2017/REC-WebCryptoAPI-20170126/) which allows applications to perform cryptographic operations in the browser therefore allowing DID to authenticate users without passwords.

## Open ID Connect

[Open ID Connect](https://openid.net/connect/) is a simple identity layer on top of the [OAuth 2.0 protocol](https://oauth.net/2/) and allows applications to exchange information about authenticated sessions and end-users.

![How DID works: Open ID Connect Integration](/assets/images/how-did-works/how-did-works-open-id-connect-integration.png)

Let’s look in more detail at step four of the diagram above.  This is the step where DID authenticates the user.

When a user presents themselves at DID for the first time, the user’s browser generates a public and private key.  DID asks for the user’s email address this is sent to DID along with the user’s new public key.  Next, DID generates long, random code and sends it to the user's email address. 

The user receives and accesses the email that DID sent.  Inside that email is a link containing the long code that DID generated.  When this link is clicked it proves to DID that the user has access to the email address.  The long, random nature of the code means it cannot be guessed.  The code is also only valid for a limited period of time.

A signature is also sent to DID via the link in the user's email which also proves to DID that the user has access to their private key.

Finally, DID sends another unique code back to the browser which the requesting website uses to grant the user access.

![How DID works: Signing In With Email](/assets/images/how-did-works/how-did-works-signing-in-with-email.png)

Once a user has initially authenticated by email they can, in future, authenticate with the keys they now have on their device.  The device can provide a trusted signature to DID instead of this process having to be done via email.

This diagram shows the simpler process of authenticating with DID using existing keys:

![How DID works: Signing In With Public Key](/assets/images/how-did-works/how-did-works-signing-in-with-public-key.png)

Using the methods outlined above, DID verifies a user by asking them to provide a signature which proves they have access to the private key.  In practice this means DID verifies a user by ownership of an email address OR ownership of a device.  

Every time a user signs in with DID, the public key is used to generate a challenge only that specific user can solve with their private key and once the challenge is solved it expires.

The result is a very fast and secure sign in process.

To summarise how DID works into one sentence:

**DID is an Identity Provider, that authenticates users by verifying access to either an email address or securely stored private key.**

