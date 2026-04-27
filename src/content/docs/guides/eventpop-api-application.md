---
title: Eventpop API Application
description: "Request API credentials for your integration"
sidebar:
  order: 2
---

An API Application provides OAuth 2.0 credentials (Client ID & Secret) that authenticate your integration with Eventpop.

## Requesting an API Application

Creating API Applications is currently by request only. Contact our developer team with the following information:

- **Organizer name or ID** - The organizer account that will own this application
- **Use case** - Brief description of what you're building (e.g., "ticket validation app", "event widget")
- **Callback URL** - The URL where users will be redirected after authorization, e.g. `https://your-awesome-app.com/oauth/callback`

## Your Credentials

Once approved, you'll receive:
- **Client ID** - Public identifier for your application
- **Client Secret** - Keep this secure! Never expose it in client-side code or commit it to version control

These credentials are used for [authentication](./authentication) via OAuth 2.0.
