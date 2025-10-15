import { Capabilities } from '@/enum/capabilities.enum';
import { Skills } from '@/enum/skills.enum';
import { Engagement } from '@/interfaces/engagement.type';

const engagements: Engagement[] = [
  {
    title: 'Voltage Park',
    slug: 'voltage-park',
    start: 2024,
    end: 2024,
    description:
      'Designed and built a bespoke customer support portal via integration with a third-party GraphQL API.',
    href: 'https://www.voltagepark.com/',
    capabilities: [Capabilities.design, Capabilities.frontend],
    skills: [
      Skills['Next.js'],
      Skills['trpc'],
      Skills['Clerk'],
      Skills['GraphQL'],
      Skills['Tailwind'],
    ],
    shots: 5,
  },
  {
    title: 'OpenFi',
    slug: 'openfi',
    start: 2024,
    end: 2024,
    description:
      "Designed and developed the UX, along with a design system library and mockups for key components of the company's MVP.",
    href: 'https://www.openfi.tech/',
    capabilities: [Capabilities.design],
    skills: [Skills['Figma']],
    shots: 4,
  },
  {
    title: 'NU',
    slug: 'nu',
    description:
      'Collaborated with backend, product, and design teams to design and develop an MVP for an AI-powered, multi-omics platform for healthcare practitioners.',
    start: 2024,
    end: 2024,
    href: 'https://www.thenu.com/',
    skills: [
      Skills['Material UI'],
      Skills['Vite'],
      Skills['React Admin'],
      Skills['Figma'],
    ],
    capabilities: [Capabilities.design, Capabilities.frontend],
    shots: 6,
  },
  {
    title: 'Albert & Arthur',
    description:
      'Started this company with my wife, designing and building the brand and website. Explored headless eCommerce solutions ( Medusa, Shopify, CommerceLayer, Swell) before creating a custom solution.',
    start: 2024,
    slug: 'albert-arthur',
    end: 2024,
    href: 'https://albert-arthur.com/',
    capabilities: [
      Capabilities.design,
      Capabilities.frontend,
      Capabilities.backend,
    ],
    skills: [
      Skills['Contentful'],
      Skills['Next.js'],
      Skills['Figma'],
      Skills['NX'],
      Skills['trpc'],
    ],
    shots: 1,
  },
  {
    title: 'Collie',
    slug: 'collie',
    start: 2021,
    end: 2023,
    description:
      'Designed and developed a customer-facing booking portal with a Nest.js backend, integrating multiple courier APIs through microservices. Delivered the final product as both a user interface and an API.',
    href: 'https://www.itdglobal.com/',
    skills: [],
    capabilities: [
      Capabilities.design,
      Capabilities.frontend,
      Capabilities.backend,
    ],
    shots: 0,
  },
  {
    title: 'ITD Global',
    slug: 'itd-global',
    start: 2021,
    end: 2023,
    description:
      'Designed and developed a customer-facing booking portal with a Nest.js backend, integrating multiple courier APIs through microservices. Delivered the final product as both a user interface and an API.',
    href: 'https://www.itdglobal.com/',
    skills: [],
    capabilities: [
      Capabilities.design,
      Capabilities.frontend,
      Capabilities.backend,
    ],
    shots: 0,
  },
  {
    title: 'Airfinity',
    slug: 'airfinity',
    start: 2018,
    end: 2021,
    description:
      'Designed and developed the original website and data intelligence product, which gained significant traction during COVID. Worked with data science and backend teams to build a flexible API for delivering custom, client-tailored views.',
    href: 'https://www.airfinity.com/',
    skills: [Skills['React'], Skills['Tailwind'], Skills['Auth0']],
    capabilities: [Capabilities.design, Capabilities.frontend],
    shots: 0,
  },
];

export { engagements };
