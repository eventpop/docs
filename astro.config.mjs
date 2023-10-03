import { defineConfig } from "astro/config"
import starlight from "@astrojs/starlight"
import { generateAPI } from "starlight-openapi"

// Generate the documentation and get the associated sidebar groups.
const { openAPISidebarGroups, starlightOpenAPI } = await generateAPI([
  {
    base: "api",
    label: "API Reference",
    schema: process.env.API_SCHEMA ?? "./schemas/public.json",
  },
])

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Eventpop API Documentation",
      social: {
        github: "https://github.com/eventpop",
      },
      sidebar: [
        // {
        //   label: "Guides",
        //   items: [
        //     // Each item here is one entry in the navigation menu.
        //     { label: "Getting Started", link: "/guides/getting-started" },
        //   ],
        // },
        {
          label: "Guides",
          autogenerate: { directory: "guides" },
        },
        // {
        //   label: "Reference",
        //   autogenerate: { directory: "reference" },
        // },
        ...openAPISidebarGroups,
      ],
    }),

    // Add the Starlight OpenAPI integration.
    starlightOpenAPI(),
  ],
})
