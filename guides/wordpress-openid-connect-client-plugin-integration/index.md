---
layout: doc
title: "Wordpress Integration Guide"
abstract: ""
---

This guide will step you through the process of adding DID to your Wordpress website using the ‘WordPress OpenID Connect Client' plugin by miniOrange.  If you have any difficulty completing the guide please email us for support: [team@did.app](mailto:team@did.app).

You can also refer to a working example on our demo website: [wordpress.did.app](https://wordpress.did.app).  This guide assumes you have a working knowledge of Wordpress and a Wordpress website up and running.

## Step 1: Create a new app in your DID account

Visit [did.app](https://did.app), sign in and create a new app.  

Give your new app a descriptive name e.g. ‘Wordpress Demo’ and use the full URL of the website in the ‘host’ box.

Leave the ‘Test mode’ box unchecked.

Click ‘Create App’.

DID will now generate a Client ID and a Client Secret for your app.  Retain this information for step 3 (leave the tab open so you can come back to it).

![screenshot of DID app configuration](/assets/images/wordpress-guide/configure-did.PNG)

## Step 2: Install the plugin on your Wordpress website

In your Wordpress admin dashboard, select __Plugins > Add New__ from the main menu.

On the ‘Add Plugins’ page, search: ‘__WordPress OpenID Connect Client__’.  Look for the highlighted result in the screenshot below and click ‘Install Now’. Once the app has installed, click ‘Activate’.

![screenshot of DID app configuration](/assets/images/wordpress-guide/plugin-library-screenshot.jpg)

You can also visit the plugin’s page to download, install and activate manually if you prefer:

[wordpress.org/plugins/miniorange-openid-connect-client/](https://wordpress.org/plugins/miniorange-openid-connect-client/)

## Step 3. Configure the plugin

Once activated, the plugin creates a menu option called ‘miniOrange OpenID Connect’.  Click on this to start configuring the plugin to work with DID.

![screenshot of miniOrange OpenId connect plugin menu option](/assets/images/wordpress-guide/plugin-in-menu.jpg)

You will be presented with a screen which looks like this:

![screenshot of miniOrange OpenId connect plugin config dashboard](/assets/images/wordpress-guide/miniOrange-config-panel.jpg)

Scroll right to the bottom on this page and look for the option called ‘__Custom OpenID Connect App__’ under the heading ‘Custom Applications’.  It looks like this:

![screenshot of miniOrange OpenId connect plugin config dashboard](/assets/images/wordpress-guide/custom-applications.PNG)

Select ‘Custom OpenID Connect App’.  You will now see this screen:

![screenshot of miniOrange OpenId connect plugin config dashboard](/assets/images/wordpress-guide/plugin-config.jpg)

Complete the fields using the following values:

```
App Name: DID
Client ID: *copy and paste this from your DID app settings page.*
Client Secret: *copy and paste this from DID app settings page.*
Scope: openid
Authorize Endpoint: https://auth.did.app/oidc/authorize
Access Token Endpoint: https://auth.did.app/oidc/token

```
Make sure these options are set as follows:

1. Set client credentials in header: checked.
2. Set client credentials in body: unchecked.
3. Show on login page: checked.

Finally, press ‘__Save Settings__’.

DID’s integration with this plugin is now complete.  A ‘Sign in with DID’ button now appears on the Wordpress sign in page:

![screenshot of logging into Wordpress with DID](/assets/images/wordpress-guide/login-with-did.PNG)

## Optional: Adding Login Buttons to your Wordpress Template

You can add ‘Login with DID’ buttons elsewhere on your Wordpress website using the plugin.  To do this, choose the menu options: __Appearance > Widgets__.

In the example Wordpress theme we are using, we have been able to add a login button to ‘Footer 1’.  You can add the Login button widget to any dynamic part of your website templates by selecting the __miniOrange Open ID Connect__ widget and clicking ‘add widget’ as per the screenshot below.  The exact appearance of this will vary depending on your Wordpress theme.

![screenshot of adding login buttons to Wordpress template content blocks](/assets/images/wordpress-guide/widget1.PNG)

## Optional: Login Button Styling

The ‘Login with DID’ button can be styled with some simple CSS rules.  The following CSS can be used to style the button with DID’s colour scheme:

```
.mo_oauth_login_button {
display: block;
border: 1px solid #00dfc0;
width: auto;
text-align: center;
background-color: #00dfc0;
}
.mo_oauth_login_button_icon {
     display: none;
}

```
![screenshot of custom login button styling](/assets/images/wordpress-guide/login-with-did-styling.PNG)

### Have a question?

If you have any further questions contact us at [team@did.app](mailto:team@did.app?subject=DID-Wordpress%20question).
