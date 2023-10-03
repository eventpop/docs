---
title: User Authentication Flow
description: ""
sidebar:
  order: 5
---

This flow is similar to <a href='#app-authentication-flow'>App Authentication Flow</a> But needs user's action by granting the application to access their account with Authorization Code first.

Eventpop's user authentication implementation is based on [Authorization Code Grant
](https://tools.ietf.org/html/rfc6749#section-4.1) flow of the [OAuth 2 specification](https://tools.ietf.org/html/rfc6749).

1. User click `Connect/Login with Eventpop` from your website, or mobile application.
2. User authenticates with Eventpop via Eventpop's website, using their email & password as credentials.
3. User authorizes/allow your application to use their account.
4. User then redirects back to your website, or mobile application via `Callback URL`, along with embedded `Authorization Code`.
5. Your website, or mobile application uses `Authorization Code` to request an `Access Token`
6. The `Access Token` can be used to request user resource APIs eg. `/me`, `/tickets`

## Step-by-step Guide

### 1. Create API Application

- At the moment, creating API Application will be by request only.

### 2. Authenticate User

* Build authorize url with your `CLIENT_ID` & `CALLBACK_URL` specified in your API Application

> https://www.eventpop.me/oauth/authorize?client_id=your_client_id&redirect_uri=https://your.callback.url&response_type=code

* Redirect user to authorize url built, after that they'll be redirected back to specified callback url with embedded Authorization Code, use it in the next step

> https://your.callback.url?code=random_authorization_code

* Make a `POST` request to get Access Token to `/oauth/token` with following payload.

`POST https://www.eventpop.me/oauth/token`

### Payload

Parameter | Optional | Description
--------- | -------- | -----------
client_id | No | Your application `CLIENT_ID`
client_secret | No | Your application `CLIENT_SECRET`
code | No | Your authorization code from last step
redirect_uri | No | Your application `CALLBACK_URL`
grant_type | No | Use `"authorization_code"`

You'll get a JSON response including `access_token`

```json
{
  "access_token": "420c80567e1246996420c83917ce9649e05a84421f3993745e5432998a56bc24",
  "token_type": "Bearer",
  "expires_in": 7200,
  "refresh_token": "0a10f2486af68f2a9c8fb773ff8065384cd0002624480b9d145f9a39091898e7",
  "scope": "public",
  "created_at": 1552036500
}
```

- Use the `access_token` to request Eventpop API

You can choose between embedding the token in authorization header or within request parameters

### Access token as bearer token in authorization header

Add HTTP header `Authorization` with value prefixed with `Bearer` and a space

```shell
curl "https://www.eventpop.me/api/public/me" -H "Authorization: Bearer your_access_token"
```

### Access token in request parameters

Use your access token as query string parameter in GET requests, or body params in POST requests.

```shell
curl -X GET "https://www.eventpop.me/api/public/me?access_token=your_access_token"
```

The authorization header method is recommended, since you can include that to every requests without modifying any request parameters.
