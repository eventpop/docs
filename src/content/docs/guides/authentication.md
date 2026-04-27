---
title: Authentication and Authorization
description: "OAuth 2.0 authentication flows for accessing Eventpop API"
sidebar:
  order: 4
---

Eventpop API uses OAuth 2.0 for authentication. Choose the flow based on what resources you need to access:

- **User Authentication Flow** - Access user resources (public scope) or organizer resources (organizer scope)
- **App Authentication Flow** - Legacy server-to-server authentication (use User Authentication with organizer scope instead)

## User Authentication Flow

Use this flow when you need to access user profile data or organizer resources. Based on [Authorization Code Grant](https://tools.ietf.org/html/rfc6749#section-4.1) of the OAuth 2.0 specification.

**Flow overview:**
1. User clicks "Connect/Login with Eventpop" in your app
2. User authenticates on Eventpop's website
3. User authorizes your application
4. User redirects back to your callback URL with an authorization code
5. Your app exchanges the code for an access token
6. Use the access token to call APIs

### Step 1: Redirect user to authorization URL

Build the authorization URL with your credentials:

```
https://www.eventpop.me/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=https://your.callback.url&response_type=code&scope=public
```

**Parameters:**
- `client_id` - Your application Client ID
- `redirect_uri` - Your registered callback URL
- `response_type` - Use `code`
- `scope` - Request `public` (user resources) or `public organizer` (both user and organizer resources)

### Step 2: Handle the callback

After authorization, the user is redirected to your callback URL:

```
https://your.callback.url?code=AUTHORIZATION_CODE
```

### Step 3: Exchange code for access token

Make a POST request to exchange the authorization code for an access token:

```
POST https://www.eventpop.me/oauth/token
Content-Type: application/x-www-form-urlencoded
```

**Parameters:**
- `client_id` - Your application Client ID
- `client_secret` - Your application Client Secret
- `code` - The authorization code from Step 2
- `redirect_uri` - Your callback URL (must match Step 1)
- `grant_type` - Use `authorization_code`

**Response:**
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

- `access_token` - Use this to authenticate API requests (expires in ~2 hours)
- `refresh_token` - Use this to get a new access token when it expires
- `scope` - The granted scopes (e.g., "public" or "public organizer")

### Step 4: Refresh the access token

Access tokens expire after 2 hours. Use the refresh token to get a new one without user interaction:

```
POST https://www.eventpop.me/oauth/token
Content-Type: application/x-www-form-urlencoded
```

**Parameters:**
- `client_id` - Your application Client ID
- `client_secret` - Your application Client Secret
- `refresh_token` - The refresh token from Step 3
- `grant_type` - Use `refresh_token`

The response will include a new `access_token` and `refresh_token`.

## App Authentication Flow (Legacy)

**Note:** This flow is now considered legacy. Use User Authentication Flow with organizer scope instead.

For server-to-server authentication using [Client Credentials Grant](https://tools.ietf.org/html/rfc6749#section-4.4).

### Get an access token

Make a POST request:

```
POST https://www.eventpop.me/oauth/token
Content-Type: application/x-www-form-urlencoded
```

**Parameters:**
- `client_id` - Your application Client ID
- `client_secret` - Your application Client Secret
- `grant_type` - Use `client_credentials`

**Response:**
```json
{
  "access_token": "74303538dba108eb248a93842dfa3a568879ebbc49d72b5c4b8664ddeaaf52ac",
  "token_type": "Bearer",
  "expires_in": 7198,
  "scope": "public",
  "created_at": 1552035971
}
```

When the token expires (~2 hours), request a new one using the same credentials.

## Using Access Tokens

### Authorization header (recommended)

Add the `Authorization` header with `Bearer` prefix:

```shell
curl "https://www.eventpop.me/api/public/me" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Query parameter

Include `access_token` as a query parameter (GET) or body parameter (POST):

```shell
curl "https://www.eventpop.me/api/public/me?access_token=YOUR_ACCESS_TOKEN"
```

The authorization header method is recommended for all requests.

## Understanding Scopes

- **public** - Access user profile and user-owned resources (orders, tickets) when using User Authentication. Access organizer resources when using App Authentication (legacy).
- **organizer** - Access all orders and tickets for events you organize. Requires the authenticated user to be associated with the organizer. Use this for analytics, check-in systems, and ticket management.

Request multiple scopes by separating them with a space: `scope=public organizer`

## Common Errors

- **401 Unauthorized** - Invalid or expired access token. Refresh the token or re-authenticate.
- **403 Forbidden** - Missing required scope or user not associated with organizer.
- **invalid_client** - Invalid Client ID or Client Secret.
- **access_denied** - User denied authorization.
