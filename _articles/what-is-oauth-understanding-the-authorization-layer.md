---
layout: article
title: "What is OAuth? Understanding the authorization layer"
abstract: "A simple explanation of what OAuth is, how it works and what it is used for."
sitemap:
  lastmod: 2020-05-15
---

OAuth is short for Open Authorization.  

OAuth 2.0 is a framework for token-based authorization on the web. What does that mean?  Basically, OAuth is a way for websites to share private information that belongs to an authenticated user of that website.  Authorization tokens are issued which grants access to specific pieces of information hence the term token-based authorization.

**OAuth 1.0 and OAuth 2.0 are distinctly different.  When I refer to OAuth I am referring specifically to OAuth 2.0.  If you would like to find out more about the differences between versions 1 and 2 you can[ read the OAuth entry on Wikipedia](https://en.wikipedia.org/wiki/OAuth) as the differences are not relevant to this article.**

For example, let’s say you want to share your social media profile with a dating website.  You would like the social media website to share your name, date of birth and profile image.  OAuth can be used to grant the dating app access to those details on the social media website.  

The framework allows the social media website to create an access token which the dating website uses to request the data you shared from your social media profile.

This method allows you, the user, to share specific pieces of information stored on one website with another website.  Before OAuth was invented, if two websites wanted to share information they had little choice but to share actual login credentials and therefore share all the information stored in that account.

> “Third-party applications gain overly broad access to the resource owner's protected resources, leaving resource owners without any ability to restrict duration or access to a limited subset of resources.”

[Source - The OAuth 2.0 Authorization Framework By the Internet Engineering Task Force](https://tools.ietf.org/html/rfc6749)

OAuth is all about granting authorization to access private things.  OAuth is not used for authentication.  A mistake commonly made is to assume the ‘auth’ in OAuth stands for authentication.

DID.app is an authentication provider that works with the OAuth 2.0 framework helping to add an authentication layer on top of OAuth's authorization layer.

## How does OAuth work?

This diagram illustrates the six steps that are taken when one website requests information from another:

![Diagram showing the 6 steps of OAuth](/assets/images/how-oauth-works.png "How OAuth works diagram")

By granting access, the resource owner gives the requesting website (client) to ask the authorization server for access to the resource the owner has given it permission to access.

A token is exchanged which is used to prove to the resource server that the requesting website has authorization to access the resource.

## The difference between authorization and authentication

OAuth is referenced a lot when discussing authentication.  This is largely because when a website authenticates a user it typically wants to give that user authorization to access protected resources such as pages on a website or images on a server.

Authentication and authorization, therefore, go hand in hand but they are distinctly different.

Authentication is the process of proving a user is who they say they are.  When you visit a website to access your account you need to tell the website who you are so they can show you the right private pages and you need to prove your identity.

This can be done in a variety of ways but [authentication always boils down to three factors](https://did.app/articles/the-three-factors-of-authentication): what you know, what you have, and what you are.  

In the case of DID.app, we authenticate users by asking them to prove they have access to their email account or a previously registered device.  [Find out more about how DID works here](https://did.app/articles/how-did-works).

Authorization on the other hand is the process of giving your authenticated user access to certain protected resources.  So, user A might be authenticated by DID.app and the website then knows that user A is authorized to access protected resources 1, 2 and 3.

The key takeaway is that OAuth doesn’t do authentication.

## OAuth’s relationship with DID.app

You will no doubt be wondering what OAuth has got to do with DID.app since DID.app is an identity provider and, therefore, primarily concerned with authentication and not authorization.

Good question.  DID.app uses OpenID Connect to share authentication states between DID.app and the requesting website.  OpenID Connect lets developers authenticate their users across websites and apps without having to own and manage password files. Once DID.app has authenticated the user with either email or a securely stored private key, this authentication state is shared with the website requesting it.

OpenID Connect is an interoperable authentication protocol based on the OAuth 2.0 family of specifications.  Essentially it’s an identity layer that works perfectly with the authorization layer.

OpenID Connect uses the standard message flows defined in the OAuth 2.0 specification to communicate authentication states once the authentication has taken place.

## Further reading

Here are some useful resources if you would like to find out more about OAuth, Open ID Connect or the Open ID Foundation:

- [OAuth 2.0 authorization framework](https://tools.ietf.org/html/rfc6749)
- [Open ID foundation](https://openid.net/foundation/)
- [Open ID Connect FAQ](https://openid.net/connect/faq/)

If you have any questions about OAuth, Open ID Connect, passwordless authentication or any of the concepts discussed on this website please do reach out to us on team@did.app. 
