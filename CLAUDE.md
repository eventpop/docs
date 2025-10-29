# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Eventpop API documentation site, built with Astro and Starlight. It uses the `starlight-openapi` plugin to automatically generate API reference documentation from OpenAPI schemas located in the `schemas/` directory.

## Package Manager

This project uses **pnpm** as the package manager (version 9.6.0). Always use pnpm commands, not npm or yarn.

## Essential Commands

```bash
# Install dependencies
pnpm install

# Start development server (runs on localhost:4321)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run Astro CLI commands
pnpm astro <command>
```

## Architecture

### OpenAPI Schema Integration

The core architecture revolves around automatic API documentation generation from OpenAPI schemas:

- **Schema location**: `schemas/public.json` contains the Eventpop Public API OpenAPI v2.0 (Swagger) specification
- **Build-time generation**: `astro.config.mjs` uses `starlight-openapi`'s `generateAPI()` function at build time to:
  - Parse the OpenAPI schema
  - Generate static documentation pages under the `/api` route
  - Create sidebar navigation groups that integrate with manual documentation
- **Environment override**: The schema path can be overridden via `API_SCHEMA` environment variable

### Content Structure

- **Manual guides**: Located in `src/content/docs/guides/` - these are handwritten Markdown files covering:
  - Getting started prerequisites
  - OAuth authentication flows (user and application)
  - API application setup
  - Resource types
- **Auto-generated API reference**: Generated from the OpenAPI schema and served under `/api` route
- **Content schema**: Uses Starlight's built-in `docsSchema` defined in `src/content/config.ts`

### Documentation Organization

The sidebar navigation combines both manual and auto-generated content:
1. "Guides" section (auto-generated from `src/content/docs/guides/` directory)
2. API reference sections (dynamically generated from `openAPISidebarGroups`)

## Working with OpenAPI Schemas

When modifying the API documentation:

- **Schema changes**: Edit `schemas/public.json` directly
- **Rebuild required**: Changes to the schema require a rebuild (`pnpm build` or restart `pnpm dev`) to regenerate API docs
- **Schema format**: Currently uses OpenAPI v2.0 (Swagger) format
- **Authentication**: The schema defines two OAuth 2.0 flows:
  - `user_token`: Authorization code flow for user-scoped access
  - `application_token`: Client credentials flow for application-scoped access

## File Conventions

- Documentation files use `.md` or `.mdx` extensions
- Each guide file includes frontmatter with `title`, `description`, and `sidebar.order`
- The homepage uses the `splash` template (`src/content/docs/index.mdx`)
