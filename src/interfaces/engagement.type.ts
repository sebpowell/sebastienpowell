import { Capabilities } from '@/enum/capabilities.enum';
import { Skills } from '@/enum/skills.enum';

type Engagement = {
  title: string;
  description: string;
  slug: string;
  start: number;
  end: number;
  href: string;
  capabilities: Capabilities[];
  shots: number;
  skills: Skills[];
};

export type { Engagement };
