---
layout: wiki-post
title: Creating great authentication user experiences and why it matters
abstract: "What makes for a great authentication user experience and what’s wrong with what we’ve got right now?"
sitemap:
  lastmod: 2019-12-19
---

**Authentication** as we know it today came about in 1961 with the invention of the ‘password’ at MIT. The problem was simple, multiple users needed to access private files on one computer and a simple password provided the answer. A year later, the first password hack took place, on the same machine, and so the stage was set for nearly 60 years of passwords (and password hacks) being the de facto authentication method endured by us all.

![illustration of tiny people trying to unlock a smartphone with a large key](/assets/images/user-auth-illustration.png "Authentication can sometimes feel like finding a lost key for a padlock we forgot we had.")

But what makes for a great authentication user experience and what’s wrong with what we’ve got right now? Let’s start by defining great user experience.

Great user experience at its core puts user’s needs first. Whichever hexagon of the [user experience honeycomb](http://semanticstudios.com/user_experience_design/) (by Peter Melville) we are working on: “User experience (UX) focuses on having a deep understanding of users, what they need, what they value, their abilities, and also their limitations.” _[Source](http://semanticstudios.com/user_experience_design/)_.

For us at DID, we interpret that, in terms of authentication, as thinking about how the user could have the best sign in user experience first and thinking about how to achieve that with a secure technical solution second.

At the birth of the password in 1961, the problem was solved with a technical solution that users had to accept. Now we know how we’re defining great user experience, let’s apply that to authentication.

In the definition cited, we are looking for a ‘deep understanding of users’ in terms of:

**1, What the user needs**

Users need access to the secrets we are guarding. It’s helpful to prevent unwanted access to those secrets but from a user’s point of view, they just want access. They know they have a right to access those secrets and they need that access now. In essence, this is about ensuring the authentication is fast.

**2, What the user values**

In terms of authentication, the user values their privacy. If they didn’t value their privacy they would hang their secrets out to dry on the front porch so security is important. The user wants to feel their secrets are well guarded.

**3, The user’s abilities**

Human beings are [great at certain types of tasks](https://www.abebooks.co.uk/9780849319976/Information-Security-Management-Handbook-Fifth-0849319978/plp) that computers are less able at and vice versa. User experience design should play to the user’s strengths. Not only will the user be good at the task you asked them to perform but they’ll feel ok about doing it.

**4, The user’s limitations**

Conversely, human beings are not great at some things so good user experience design should avoid asking users to do things they find difficult. However, there is a deeper meaning here which asks the designer to consider any disabilities the user has such as a visual impairment or a disability which prevents the user from using an input such as a keyboard, mouse or touchscreen.

Let’s put what we’ve learned so far into practice:

## How to create great authentication user experience

To start with, here’s a broad brush statement of what we’re trying to achieve here: we want fast, secure authentication that is easy to use for everyone, regardless of ability.

For each part of that statement, we present a comparison between the five main types of authentication available today: email authentication, device authentication, username & password, username & password with multi factor authentication and social login or OAuth 2.0.

_Please note - we have not included password managers in this comparison because they are external to the website’s authentication process. This comparison focuses on authentication methods that the website developer has control over. Levels of password manager adoption varies between audiences and we can’t assume all users visiting the website use a password manager._

### Fast (Speed Tests)

The aim is to provide users with the fastest way to authenticate so they can have access to their secrets (the need) without delay. Let’s consider how fast each authentication method is:

**Email Authentication**

**Method:**

1. User initiates authentication.
2. User inputs email address.
3. User clicks ‘submit’.
4. User navigates to inbox.
5. User opens email.
6. User clicks link.
7. Authentication complete.

Note: the link clicked automatically signs the user and loads the page the user is trying to reach. No more clicks are needed to reach the user’s secrets after the link click.

**Perceived speed:**

A single form field on a sign in page is simple and takes a small amount of time to type an email address into it. Users are usually very familiar with their own email address but time taken to type the email address will vary. The single form field gives the perception of speed since it’s half the number of form fields a user might be used to if they are being asked to enter a username and password.

**Actual speed: 20 seconds.**

Actual speed will vary depending on the time it takes for the user to receive the email. [DID shares the time it takes for our users to receive emails from us](https://status.postmarkapp.com/). Typically, email delivery is achieved in under 3 seconds.

**Device Auth**

**Method:**

1. User initiates authentication.
2. User is asked to confirm date of previous sign in.
3. Authentication complete.

**Perceived speed:**

“Wow that was quick.” User feedback.

**Actual speed: 4 seconds.**

This will vary depending on how long the user chooses to study the ‘confirm sign in’ page but the technology operating in the background only takes milliseconds to run. The user chooses the pace at which they sign in, the technology here is never likely to slow the user down.

**Username & Password**

This method of authentication has two possible routes to successful authentication so we consider both:

**Method (password correct):**

1. User initiates authentication.
2. User enters username.
3. User enters password.
4. User clicks ‘sign in’ (or similar equivalent button).
5. Authentication complete.

**Method (password incorrect):**

1. User initiates authentication.
2. User enters username.
3. User enters password.
4. User clicks ‘sign in’ (or similar equivalent button).
5. User is informed that password is incorrect.
6. User clicks ‘Forgot password’ link.
7. User re-enters email address to which the password reset email should be sent.
8. User clicks ‘Submit’.
9. User navigates to inbox.
10. User opens email.
11. User clicks ‘reset password link’ and is automatically navigated to the reset page.
12. User enters new password (may be asked to enter new password twice).
13. User clicks ‘confirm’ or similar.
14. User returns to sign in page.
15. User enters username.
16. User enters new password.
17. User clicks ‘Sign in’.
18. Authentication complete.

**Perceived speed:**

Regarding the ‘password correct’ authentication, the perceived speed is neither particularly slow nor particularly fast. This authentication method is the standard we have become conditioned to so it is the benchmark in many user’s minds as the ‘normal’ amount of time it takes to sign in.

If the user’s password is incorrect and a reset is necessary the perception is that this process is very slow, complicated and frustrating.

**Actual speed:**

- Password correct: 21 seconds.
- Password incorrect: 1 minute 36 seconds.

**Username & Password with MFA**

For this method we will assume the password has been entered correctly and that the multi factor authentication takes the form of a text message (other forms are available such as the Google Authenticator app).

**Method:**

1. User initiates authentication.
2. User enters username.
3. User enters password.
4. User clicks ‘sign in’ (or similar equivalent button).
5. User is given instructions for the MFA.
6. Text message arrives on mobile device.
7. User views text message on lock screen.
8. User types code into input provided.
9. User clicks ‘confirm’ or similar (sometimes websites validate the MFA code automatically so step 8 is not necessary).
10. Authentication complete.

**Perceived Speed:**

Using standard username and password as a benchmark, the user will see this as being slower.

**Actual speed: 34 seconds**

Depends largely on the time the text takes to arrive. In our test the text arrived very quickly giving us a result of: 34 seconds.

**Social Login / OAuth 2.0**

For this final method, we are going to assume the user is already logged into Facebook / LinkedIn / Google or any other platform with which OAuth 2.0 is available.

**Method:**

1. User initiates authentication.
2. User clicks ‘sign in with [chosen platform]’.
3. User is navigated to platform page.
4. User asked to grant permission to platform and website to share data by clicking ‘confirm’ (or similar).
5. Authentication complete.

**Perceived Speed:**

This method might take roughly the same amount of time as entering a password but might feel like it is taking longer if multiple page redirects are needed.

**Actual Speed: 13 seconds.**

**Speed summary**

- <span style="color:green;">Green - Very fast</span>
- <span style="color:orange;">Orange - Fast</span>
- <span style="color:red;">Red - Slow</span>
- <span style="color:blue;">Blue - Very slow</span>

| Email Auth                                 | Device Auth                              | User & Pass                                | Password Reset                                 | User & Pass + MFA                       | OAuth 2.0                                  |
| ------------------------------------------ | ---------------------------------------- | ------------------------------------------ | ---------------------------------------------- | --------------------------------------- | ------------------------------------------ |
| <span style="color:orange;">20 secs</span> | <span style="color:green;">4 secs</span> | <span style="color:orange;">21 secs</span> | <span style="color:blue;">1 min 36 secs</span> | <span style="color:red;">34 secs</span> | <span style="color:orange;">13 secs</span> |

_These speed test results were collected from a controlled user test of each authentication method._
<br/>

### Security

The user values security in order to protect their secrets. Let’s consider the security of the five authentication methods available:

**Email Authentication**

Email accounts need to be protected with a strong password. If this is the case, email authentication is secure because the password protecting the email account is secure. The link inside the authentication email sent (sometimes referred to as a ‘magic link’) can only be used once and will only work for a limited time.

**Device Authentication**

Device authentication works by placing a secret key onto the device. The authentication service uses this key to confirm the device is trusted and grants access. The entropy of the keys render them crackable in no less than 8 trillion years at current maximum achievable computing power.

Devices should be locked with a passcode or biometric security. Only the user with access to the device can sign into the service if the device is unlocked.

**Username and Password**

Usernames are often email addresses which we also use to communicate openly so this method relies solely on the strength of the password, however, since password reset emails are a necessity, a username and password is only as secure as the email account used for the password reset.

This [article by Alex Weinert on why passwords don’t matter](https://techcommunity.microsoft.com/t5/Azure-Active-Directory-Identity/Your-Pa-word-doesn-t-matter/ba-p/731984) highlights the shortcomings of passwords as a method for securing user accounts.

**Username and Password with MFA**

Multi Factor Authentication adds an additional layer of device security by sending a text message to the user’s phone. However, the user doesn’t need to have access to that device (via passcode or biometric match) if the text message displays openly on the lock screen. It is possible, although rather difficult, to steal a phone number if you know enough about the target user.

**OAuth 2.0**

Similar to email authentication and password reset, this method is only as secure as the method securing the third party account. However, if the third party account is compromised that can cause a problem: “If you use the same password across different sites, and your password is hacked on a site that takes security less seriously, attackers could gain access to your main social media account. If you're using that account to log in elsewhere, you could suddenly have a huge problem on your hands.” _[Source](https://dzone.com/articles/social-login-on-the-rise-how-secure-is-it)_.

### User’s Abilities

Human beings are great at remembering words, groups of numbers, names, places, flavours, routes, smells and more but we are not good at remembering long strings of random characters such as hInGyt%ljj!vbBN&ks.

Unfortunately, this is exactly the form a secure password should take. In terms of the five authentication methods we are looking at in this article, human memory is just not cut out for remembering a strong password and even less well suited to remembering several. The average user has around 90 user accounts online so strong passwords quickly become a problem for our memories.

The logical conclusion is that authentication that plays to the user’s strengths wins over authentication that does not.

The three forms of authentication discussed in this article that do not use passwords, therefore, play to the user’s strengths (abilities) whereas the two forms that require the use of a password do not play to the user’s strengths.

### User’s Limitations

Accessibility online is important to get right for those less able. Authentication is particularly important to get right to give all users equal access. There are two main ways in which a less able user may struggle to use authentication:

1. The user may not be able to see and therefore read.
2. The user may not be able to use a keyboard.

Let’s consider each of the five authentication methods and whether they can be accessible or not:

**Email Authentication**

**For visually impaired users:**

The ‘email’ input field can be read by a screen reader. Screen readers can be used to access the email application and good instructions can be provided in the email so the user can find the link in order to click it.

**For users that cannot use a keyboard:**

An email address could be entered into the field using voice to text software.

**Device Authentication**

**For visually impaired users:**

So long as the confirmation message is screen reader compatible this method is very user friendly for users with visual impairments.

**For users that cannot use a keyboard:**

No keyboard input is required.

**Username and Password / Username and Password with Password Reset**

**For visually impaired users:**

The main issue is that passwords need to remain secret (obviously) but screen readers read them out. It is, however, entirely possible for a user to use headphones in order to limit who can hear the screen reader output.

**For users that cannot use a keyboard:**

Similarly, it’s not secure to dictate, out loud, your password to the computer. If you do dictate the password to voice to text software it could also take a long time if the password is a long random string.

**Social Login**

**For visually impaired users:**

Assuming as we did earlier that the user is logged into their social account, a screen reader can take care of this login flow easily.

**For users that cannot use a keyboard:**

No keyboard input is needed.

All of these considerations show us that no one authentication method is perfect but we can optimise authentication to be more user friendly by making it faster to use, more secure, aware of what users are good at and aware of the limitations some users experience through disabilities.

## But why does it all matter?

Why does great user authentication experience matter?

Users are used to passwords, MFA largely solves the insecurity problem and password managers solve the memory problem so why should we go the extra mile to improve authentication user experiences?

Because users deserve better. At the end of the day, your users are your customers and if we want users to have a good time online and keep coming back to read our content, engage with our message and buy our products we should always want everything we offer them, not just authentication, to be user optimised.

But authentication touches every single user and it’s often the first thing we ask a user to do and because first impressions count, authentication user experience is especially important to optimise.

**Put your users in a good frame of mind**

Whatever your website offers, happy users are valuable users. They are more likely to engage, more likely to stick around and more likely to buy. Bad authentication, such as long-winded password resets, are guaranteed to subdue the user’s mood. Some users will find it mildly irritating, others will get all out password-rage. Red-faced, furious and frustrated users do not engage well with your content. They do not engage well at all.

![woman throwing her laptop down with password rage](/assets/images/password-rage.jpg "We all get password rage sometimes.")

**Live up to your brand’s values**

You say you value your customers and want to offer them great support. Poor authentication user experiences don’t uphold those values. Stand by what you believe in with authentication that will leave your user feeling great about your brand and the extra effort you’ve made to making their life sweeter.

**Good experiences are secure experiences**

Nobody likes a breach and nobody likes a hack. Authentication methods that use passwords, put way too much responsibility onto the shoulders of yours users to choose a ‘secure’ password. The majority of users will simply reuse an insecure password because the fact is, it’s too hard to do it securely.

Good authentication is easier to use and easier for the user to stay secure. This has obvious benefits: your user’s secrets stay secret.

**Sign in equals sales**

If your business relies on the user being signed in in order to make a sale, improving authentication user experience should be right at the top of your priority list. Poorly implemented authentication leads to drop-offs.

**Accessible for all**

Let’s make the web equally effortless to engage with for everyone.

We’d love to know what you think, if you would like to leave us a comment please email us on [team@did.app](mailto:team@did.app) and we’ll do our best to publish comments if you’re happy for us to do so.
