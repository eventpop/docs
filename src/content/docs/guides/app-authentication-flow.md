---
title: App Authentication Flow
description: ""
sidebar:
  order: 4
---

To access organizer's resource, you have to use [Client Credentials Grant](https://tools.ietf.org/html/rfc6749#section-4.4) flow of the  [OAuth 2 specification](https://tools.ietf.org/html/rfc6749).

1. Your website, or mobile application use Client ID & Client Secret to request for Application `Access Token`.
2. The `Access Token` can be used to request organizer resource APIs eg. `/events`

## Step-by-step Guide

### 1. Create API Application

- At the moment, creating API Application will be by request only.

### 2. Authenticate Application

* Make a `POST` request to get Access Token to `/oauth/token` with following payload.

`POST https://www.eventpop.me/oauth/token`

### Payload

Parameter | Description
--------- | -----------
client_id | Your application `CLIENT_ID`
client_secret | Your application `CLIENT_SECRET`
grant_type | Use `"client_credentials"`

You'll get a JSON response including `access_token`

```json
{
  "access_token": "74303538dba108eb248a93842dfa3a568879ebbc49d72b5c4b8664ddeaaf52ac",
  "token_type": "Bearer",
  "expires_in": 7198,
  "scope": "public",
  "created_at": 1552035971
}
```

* Use the `access_token` to request Eventpop API

You can choose between embedding the token in authorization header or within request parameters
