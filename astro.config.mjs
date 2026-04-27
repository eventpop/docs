import { defineConfig } from "astro/config"
import starlight from "@astrojs/starlight"
import starlightOpenAPI, { openAPISidebarGroups } from "starlight-openapi"

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Eventpop API Documentation",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/eventpop",
        },
      ],
      plugins: [
        starlightOpenAPI([
          {
            base: "api",
            label: "API Reference",
            schema: process.env.API_SCHEMA ?? "./schemas/public.json",
          },
        ]),
      ],
      sidebar: [
        {
          label: "Guides",
          autogenerate: { directory: "guides" },
        },
        ...openAPISidebarGroups,
      ],
    }),
  ],
})
