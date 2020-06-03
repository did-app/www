---
layout: article
title: "Building The Best One Click Sign In"
abstract: "One click sign in using device authentication offers convenience and security to the user."
sitemap:
  lastmod: 2020-05-18
---

One click sign in allows users to authenticate in just one click.  Delivering this sought after feature was a challenge but we are pleased with the results. This is our story of implementing one click sign in with DID.app.

## Why do we need one click sign in?

The world has an app over population problem.   There are so many websites and apps that want you to create an account users are fast developing ‘account creation fatigue’. The average user already has 150 accounts and the pace of growth shows no sign of slowing.

That’s why we need one click sign in.  Users want to engage with content online without filling in endless forms, choosing yet another password or confirming their email address.  Users want convenience.  Or, to put it another way, users are lazy. I know I am.

## How does one click sign in work?

Single factor authentication can rely on one of three things: something you know, something you have or something you are.  In a typical username and password setup, the user relies on something only they know (their password) to prove their identity.  In one click sign in, we rely on something the user has.  The one thing every user has is a device. 

The user authenticates by proving they have access to a specific device. If the device is present, the user is authenticated.  This is achieved by using a simple cryptographic transaction between DID.app and the user’s device initiated by a single click.

## Speed, Security and Safeguards

But we didn’t want to just make one click sign in for it to be mediocre.  We set ourselves the challenge of making OCSI really fast and more secure with sensible safeguarding for fallback.

As a background to speed, we compare DID.app’s one click sign in to social sign in.  Social sign in offers a level of convenience to the user but it’s quite slow.  The user has to wait while the website communicates with the social network to carry out the authentication transaction.

This server to server communication is at the mercy of the network connection between the device, the website and the social network.

DID.app reduces the network calls to an absolute minimum and only transacts between DID.app and the device itself.  Device authentication is much faster and lighter on the network than the equivalent social OCSI.

In terms of security, our OCSI works using cryptography.  A key pair generated and stored by the device are challenged by DID.app to prove identity.  The user actually has to have access to the physical device for OCSI to work.  Users can set up multiple devices if they regularly use more than one device.  This greatly reduces the threat of account theft because hacking is only economical on scale and without actually having to nick people’s handbags.

Devices today are locked with passcodes, fingerprint scans and even face scans. As any parent will likely attest, devices rarely depart from their owners and if a device is lost or stolen, the device’s keys can be revoked easily and remotely.

By comparison, passwords are prone to phishing, guesswork and brute force.  Social media accounts secured with passwords fall victim to the same threat and even some text messaging based MFA has weaknesses given that sim cards can be cloned.

No solution is perfect but device authentication is the least scalable form of account theft simply by virtue of the fact the hacker must have access to an unlocked physical device to be even in with a chance.

Finally, the best solutions recognise when a fallback may be needed.  On the rare occasion the user wants to use a shared computer to access their account, OCSI is not possible so DID.app falls back to [magic links](https://did.app/articles/building-the-best-magic-link).

## One Click Sign In Goes Hand in Hand With Conversions

One click sign in is all about convenience.  Users hate creating accounts, it’s not rocket science. What’s there to love about coming up with a new password or endlessly forgetting which social network you used to sign in last time?

Convenience for the user equals conversions for your website.  If you’re authenticating at all, you are looking for user engagement.  Users turning away at sign up isn’t great use of marketing spend. No solution will ever induce a 100% conversion rate but OCSI can help cut your losses.

There is perhaps a more pressing point than conversions.  OCSI is also about being respectful of your user’s time and giving them the best possible customer service experience you can muster.

Happy customers are usually easier to work with.  The genuine convenience of OCSI gives users a truly frictionless authentication experience.  Users end up in a much better frame of mind than if they’d been sent round the houses on a whistlestop tour of their inbox, your password reset pages and back to the sign in page again.  

If you would like to find out more about the technical inner workings of DID, read our [‘How DID Works’](https://did.app/articles/how-did-works) page.  If you have any questions about one click sign in, please email us: team@did.app


