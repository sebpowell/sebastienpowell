import { Skills } from "@/enum/skills.enum";
import { Capabilities } from "@/enum/capabilities.enum";

// Helper function to validate tags against Skills enum
export function validateTags(tags: string[]): string[] {
  const validTags: string[] = [];
  const invalidTags: string[] = [];
  
  tags.forEach(tag => {
    if (Object.values(Skills).includes(tag as Skills)) {
      validTags.push(tag);
    } else {
      invalidTags.push(tag);
    }
  });
  
  if (invalidTags.length > 0) {
    console.warn(`Invalid tags found: ${invalidTags.join(', ')}. Valid tags are: ${Object.values(Skills).join(', ')}`);
  }
  
  return validTags;
}

// Helper function to validate capabilities against Capabilities enum
export function validateCapabilities(capabilities: string[]): string[] {
  const validCapabilities: string[] = [];
  const invalidCapabilities: string[] = [];
  
  capabilities.forEach(capability => {
    if (Object.values(Capabilities).includes(capability as Capabilities)) {
      validCapabilities.push(capability);
    } else {
      invalidCapabilities.push(capability);
    }
  });
  
  if (invalidCapabilities.length > 0) {
    console.warn(`Invalid capabilities found: ${invalidCapabilities.join(', ')}. Valid capabilities are: ${Object.values(Capabilities).join(', ')}`);
  }
  
  return validCapabilities;
}

// Export enum values for easy reference in MDX files
export const SKILLS = Object.values(Skills);
export const CAPABILITIES = Object.values(Capabilities);
