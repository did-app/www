---
layout: article
title: "The three factors of authentication"
abstract: "All methods of authentication, belong to one of three types; what you know, what you have, and what your are."
share_image: /assets/images/key-business-concept-with-flat-design/cropped.jpg
sitemap:
  lastmod: 2020-03-124
---

![](/assets/images/key-business-concept-with-flat-design/cropped.jpg)

## What is authentication

Authentication is the process of validating the identity of a user to a system.
There are many different ways a user can demonstrate their identity and so be authenticated,
They methods range from presenting a train ticket or passport in the physical world, to remembering a password for an online account.

All methods of authentication can be grouped into one of three types.

## What you know

The simplest example of the "what you know" factor is a password, it can also be called a pin, pass phrase or security question.
These are known as **The knowledge factors**.

Knowledge of the secret, is used to confirm your identity.

The strength of this type of authentication method lies in it's simplicity.
Once a user knows a password they are able to reveal it where ever it is required to be authenticated.

Another strength of this method is that there is nothing to be lost or stolen.
Assuming the password has not been written down or stored anywhere.

A weakness of this approach is the difficulty in restricting knowledge of the secret to a single individual.
It is important to realise, a user must reveal their password to a system to authenticate.
Once the user has done that, the system also knows the secret and can use it to impersonate the user.

This problem with passwords is the reason you are required to use a different passwords for each service that uses passwords.

Another problems is forgetfulness.
Human beings are not perfect at retaining information, and so there is a limit to the number of secrets someone can reliably remember.

## What you have

A train ticket is an example of possessing something to prove authenticate a user.
In the train ticket case the holder is identified as the purchaser of a train fair and little other information is conveyed.

Other examples are physical keys, wrist bands, id cards as well as digital equivalents such as digital keys.
The authentication methods are collectivly knoen as **The ownership factors**.

A strength and weakness of these methods is that it is easy for users to pass them around.
It is good that you can give your keys to a neighbour to feed your cat,
but wrist bands that should be used only once have to be designed to be vary difficult to take off.

It is also important that these factors should not be easy to duplicate.
A customer who buys a train ticket should not be able to make copies.

Modern phones have special chips in them to hold digital keys to ensure that it is hard to duplicate the keys they contain.

## What you are, or do

This is how we recognise each other.
We identify friends and family because we recognise attributes about them such as their face and voice.

Their are now digital equivalents of these methods such as fingerprint, retinal scanners or other biometric identifier.

These are **the inheritance factors**.

These authentication methods provider stronger guarantees about the individual being identified because they cannot be transferred.
The counter point to this is that you cannot change them overtime.
If someone is able to produce your fingerprint you cannot choose to get a new one.

## Multi factor authentication

Most people will have heard of authentication factors when talking about Two Factor Authentication (2FA) or Multi Factor Authentication (MFA)
As online security becomes more important these terms are becoming more common.

MFA is most associated with digital authentication but it is nothing new.
Your passport contains your photo, to use it you must have your passport (ownership factor) and look like your photo (inheritance factor).

For authentication to be considered multi-factor it should use two factors of different types.
Remembering two passwords is the same as remembering one long password.

## Conclusion

Each authentication factor has it's own strengths and weaknesses.
With MFA we can combine multiple methods for more options on balancing the tradeoffs of each method.
Understanding this can help us make better decisions when deciding how to build authentication into our systems.
