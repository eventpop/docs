---
title: Types of Resources
description: "Understanding User and Organizer resources"
sidebar:
  order: 3
---

The API provides access to two types of resources, each requiring different scopes:

## User Resources (public scope)

Resources owned by the authenticated user - their profile, orders, and tickets they've purchased. Access is scoped to the current organizer only.

**Use case:** Build integrations where users log in with their Eventpop account and your app validates they bought a ticket for your event.

**Available data:**
- User profile (name, email, etc.) via `/me`
- User's orders via `/organizers/{organizer_id}/orders`
- User's tickets via `/organizers/{organizer_id}/tickets`

**Note:** Results only include orders and tickets from events organized by the specified organizer.

## Organizer Resources (organizer scope)

Access to ALL orders and tickets for events you organize. Requires User Access Token with organizer scope (the user must be associated with the organizer).

**Use cases:**
- Custom analytics and ETL workflows on ticket/order data
- Custom check-in kiosks
- Ticket validation by reference code

**Available operations:**
- Query all orders and tickets for your events
- Create tickets via `/organizers/{organizer_id}/events/{event_id}/tickets`
- Invalidate tickets via `/organizers/{organizer_id}/events/{event_id}/tickets/invalidate`
- Search tickets by reference code via `/tickets/search`

**Note:** Application Access Token is now considered legacy. Use User Access Token with organizer scope instead.
