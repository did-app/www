---
layout: "doc"
title: "Branding DID.app buttons."
abstract: "DID.app provides several styles of icon that you can use to let people sign in."
---

<style>
  .markdown-body img {
    background: none;
  }
</style>

You can use either our "D.I.D Logo" or "D Icon" to indicate to your users that they may sign in with DID.app.
Both come in four styles; **default**, **light**, **dark-mono** and **light-mono**.

### The D.I.D Logo

<div style="display:flex;justify-content:center;>
  <img src="/logo.svg" style="height:50px;margin:0.5em;padding:0.5em;">
  <img src="/logo.svg#light" style="height:50px;background:#2a454e;margin:0.5em;padding:0.5em;">
  <img src="/logo.svg#light-mono" style="height:50px;background:#00dfc0;margin:0.5em;padding:0.5em;">
  <img src="/logo.svg#dark-mono" style="height:50px;background:#00dfc0;margin:0.5em;padding:0.5em;">
</div>

```html
<img src="/logo.svg" style="padding:0.5em;">
<img src="/logo.svg#light" style="padding:0.5em;background:#2a454e;">
<img src="/logo.svg#light-mono" style="padding:0.5em;background:#00dfc0;">
<img src="/logo.svg#dark-mono" style="padding:0.5em;background:#00dfc0;">
```

### The D Icon

<div style="display:flex;justify-content:center;>
  <img src="/icon.svg" style="height:50px;margin:0.5em;padding:0.5em;">
  <img src="/icon.svg#light" style="height:50px;background:#2a454e;margin:0.5em;padding:0.5em;">
  <img src="/icon.svg#light-mono" style="height:50px;background:#00dfc0;margin:0.5em;padding:0.5em;">
  <img src="/icon.svg#dark-mono" style="height:50px;background:#00dfc0;margin:0.5em;padding:0.5em;">
</div>

```html
<img src="/icon.svg" style="padding:0.5em;">
<img src="/icon.svg#light" style="padding:0.5em;background:#2a454e;">
<img src="/icon.svg#light-mono" style="padding:0.5em;background:#00dfc0;">
<img src="/icon.svg#dark-mono" style="padding:0.5em;background:#00dfc0;">
```

### Creating buttons

##### DID.app as a social login provider

When offering DID.app as one option among several login providers you **should** follow the guidance on this page.
If your authentication process is only handled by DID.app you may use the buttons show here, but are not required to.

### Examples

A light button that can be used on most pages.

<div style="display:inline-block;padding:0.3em;border:1px solid gray;margin:1em;border-radius:4px;">
  <span style="display:flex;align-items:center;">
    <img src="/icon.svg" style="height:30px">
    <span style="padding:0 1rem;">Sign in with DID.app</span>
  </span>
</div>

```html
<div style="display:inline-block;padding:0.3em;border:1px solid gray;margin:1em;border-radius:4px;">
  <span style="display:flex;align-items:center;">
    <img src="/icon.svg" style="height:30px">
    <span style="padding:0 1rem;">Sign in with DID.app</span>
  </span>
</div>
```

A block style sign in button

<div style="display:inline-block;padding:0.3em;margin:1em;background:#00dfc0;color:white;">
  <span style="display:flex;align-items:center;">
    <img src="/logo.svg#light-mono" style="height:30px">
    <span style="padding:0 1rem;font-weight:bold;white-space:nowrap;">Sign in</span>
  </span>
</div>

```html
<div style="display:inline-block;padding:0.3em;margin:1em;background:#00dfc0;color:white;">
  <span style="display:flex;align-items:center;">
    <img src="/logo.svg#light-mono" style="height:30px">
    <span style="padding:0 1rem;font-weight:bold;white-space:nowrap;">Sign in</span>
  </span>
</div>
```

A dark sign in button

<div style="display:inline-block;padding:0.3em;margin:1em;background:#2a454e;color:white;">
  <span style="display:flex;align-items:center;">
    <img src="/logo.svg#light" style="height:30px">
    <span style="padding:0 1rem;font-weight:bold;white-space:nowrap;">Sign in</span>
  </span>
</div>

```html
<div style="display:inline-block;padding:0.3em;margin:1em;background:#2a454e;color:white;">
  <span style="display:flex;align-items:center;">
    <img src="/logo.svg#light" style="height:30px">
    <span style="padding:0 1rem;font-weight:bold;white-space:nowrap;">Sign in</span>
  </span>
</div>
```

Icon only button.

<img src="/icon.svg#light-mono" style="height:40px;background:#00dfc0;padding:0.5em;border-radius:1em;">

```html
<img src="/icon.svg#light-mono" style="height:40px;background:#00dfc0;padding:0.5em;border-radius:1em;">
```

Matching your own app's color pallet.

When not using the DID.app green pallet, it is recommended to use the mono style icon/logo.

<img src="/icon.svg#light-mono" style="height:40px;background:rgb(29, 161, 242);padding:0.5em;border-radius:1em;">

```html
<img src="/icon.svg#light-mono" style="height:40px;background:rgb(29, 161, 242);padding:0.5em;border-radius:1em;">
```

<img src="/logo.svg#dark-mono" style="height:40px;background:rgb(29, 161, 242);padding:0.5em;border-radius:1em;">

```html
<img src="/logo.svg#dark-mono" style="height:40px;background:rgb(29, 161, 242);padding:0.5em;border-radius:1em;">
```
