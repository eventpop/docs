---
title: Types of Resources
description: ""
sidebar:
  order: 3
---

There are 2 types of resources you can get from our API

1. User resource : This type of resource are owned by your user eg. User's `Orders` & `Tickets`. By the way, they're limited to events within an organizer only. So they cannot access any orders or tickets from different organizer.
2. Organizer resource : This type of resource are owned by your organizer eg. Organizer's `Events`. You can get them with App Authentication Flow with Application Access Token.
