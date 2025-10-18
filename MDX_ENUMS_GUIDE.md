# How to Use Enums in MDX Frontmatter

## Overview
This system allows you to use your TypeScript enums (`Skills` and `Capabilities`) in your MDX frontmatter with validation and autocomplete.

## MDX File Structure

```yaml
---
title: "Your Post Title"
date: "2025-01-17"
tags: ["React", "TypeScript", "Tailwind"]  # Must match Skills enum values
capabilities: ["frontend", "design"]       # Must match Capabilities enum values
---

Your markdown content here...
```

## Available Tags (from Skills enum)
- Figma
- Adobe Creative Suite
- Next.js
- Clerk
- TypeScript
- Tailwind
- Radix
- Framer Motion
- Storybook
- Nest.js
- NX
- Contentful
- Postgres
- React Admin
- Vite
- Drizzle
- trpc
- TS-Rest
- GraphQL
- i18Next
- Auth0
- React
- Prisma
- Supabase
- Material UI
- AWS
- Tiptap

## Available Capabilities (from Capabilities enum)
- Design
- Frontend
- Backend

## Validation
- Invalid tags/capabilities will be filtered out with a warning
- Only valid enum values will be included in the final post data
- This ensures type safety and prevents typos

## Benefits
1. **Type Safety**: Only valid enum values are accepted
2. **Autocomplete**: Your IDE can suggest valid values
3. **Validation**: Invalid values are caught and warned about
4. **Consistency**: All posts use the same standardized tags/capabilities
5. **Easy Maintenance**: Add new skills/capabilities to the enum and they're automatically available
