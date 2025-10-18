// This file provides enum values for use in MDX frontmatter
// Import this in your MDX files to get autocomplete and validation

import { Skills } from "@/enum/skills.enum";
import { Capabilities } from "@/enum/capabilities.enum";

// Export enum values as arrays for easy use in frontmatter
export const SKILLS = Object.values(Skills);
export const CAPABILITIES = Object.values(Capabilities);

// Example usage in MDX frontmatter:
/*
---
title: "My Post"
date: "2025-01-17"
tags: ["React", "TypeScript", "Tailwind"]
capabilities: ["frontend", "design"]
---
*/
