---
layout: article
title: "The Three Factors of Authentication"
abstract: "All methods of authentication, belong to one of three types; what you know, what you have, and what your are."
share_image: /assets/images/key-business-concept-with-flat-design/cropped.jpg
sitemap:
  lastmod: 2020-03-124
---

![](/assets/images/key-business-concept-with-flat-design/cropped.jpg)

## What is authentication

Authentication is the process of validating the identity of a user to a system.
There are many different methods by which a user can demonstrate their identity and so be authenticated,
Methods range from presenting a ticket or passport in the physical world, to remembering a password for an online account.

All methods of authentication can be grouped into one of three types.

## What you know

The simplest example of the "what you know" factor is a password, it can also be called a pin, pass phrase or security question.
These are known as **The knowledge factors**.

Knowledge of the secret is used to confirm your identity.

The strength of this type of authentication method lies in it's simplicity.
Once a user knows a password they are able to reveal it wherever it is required to be authenticated.

Another strength of this method is that there is nothing to be lost or stolen.
Assuming the password has not been written down or stored anywhere.

A weakness of this approach is the difficulty in restricting knowledge of the secret to a single individual.
It is important to realise that a user must reveal their password to a system to authenticate.
The system therefore knows the secret and could use it to impersonate the user anywhere else they have used the same password.

The fact both user and service know the password is why it is sometimes called a shared secret.
To stay secure, a user needs to use a different password with each service.

Another problems is forgetfulness.
Human beings are not perfect at retaining information.
There is a limit to the number of secrets someone can reliably remember.

## What you have

A train ticket is an example of possessing something to authenticate a user.
In the case of the train ticket, the holder is identified as the purchaser of a train fare and little other information is conveyed.

Other examples are physical keys, wrist bands and ID cards as well as digital equivalents such as digital keys.
These authentication methods are collectively known as **The ownership factors**.

Physical keys of this sort are easy for users to share. This is both a strength and a weakness.
It is great that you can give your keys to a neighbour to feed your cat.
However wrist bands, that should only be used by one person, need to be very difficult to take off.

It is also important that these factors should not be easy to duplicate.
A customer who buys a train ticket should not be able to make copies.
Tickets often have watermarks or magnetic strips to prevent duplication.

Modern phones have special chips in them to hold digital keys to ensure that it is hard to duplicate the keys they contain.

## What you are, or do

This is how we recognise each other.
We identify friends and family because we recognise attributes about them such as their face and voice.

There are now digital equivalents of these methods such as fingerprint and retinal scanners or other biometric identifiers..

These are **the inheritance factors**.

These authentication methods provider stronger guarantees about the individual being identified because they cannot be transferred.
The counter argument here is that once your fingerprint has been stolen and duplicated you cannot simply erase your old fingerprint and ask for a new one.

## Multi factor authentication

Most people will have heard of authentication factors when talking about Two Factor Authentication (2FA) or Multi Factor Authentication (MFA)
As online security becomes more important these terms are becoming more common.

MFA is most associated with digital authentication but it is nothing new.
Your passport contains your photo, to use it you must have your passport (ownership factor) and look like your photo (inheritance factor).

For authentication to be considered multi-factor it should use authentication methods of different types.
Remembering two passwords is the same as remembering one long password, and therefore is not MFA.

## Conclusion

Each authentication factor has it's own strengths and weaknesses.
With MFA we can combine multiple methods for more options on balancing the tradeoffs of each method.
Understanding this can help us make better decisions when deciding how to build authentication into our systems.
