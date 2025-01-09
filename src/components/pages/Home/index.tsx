"use client";
import HomeAbout from "@/components/pages/Home/HomeAbout.mdx";
import { HomeContact } from "@/components/pages/Home/HomeContact";
import {
  Section,
  SectionBody,
  SectionHeader,
} from "@/components/elements/Section";
import { JSX } from "react";
import { Heading } from "@/components/elements/Heading";
import { Paragraph } from "@/components/elements/Paragraph";
import { FadeIn } from "@/components/elements/Animations/FadeIn";
import { FadeInItems } from "@/components/elements/Animations/StaggerList";
import { HomeIntro } from "@/components/pages/Home/HomeIntro";
import { WorkSampleDialog } from "@/components/elements/WorkSampleDialog";
import { HomeExperience } from "@/components/pages/Home/HomeExperience";

enum SectionIds {
  "about" = "about",
  "experience" = "experience",
  "connect" = "connect",
}

const sections: {
  id: SectionIds;
  title: string;
  description?: string;
  component: JSX.Element;
}[] = [
  {
    id: SectionIds.about,
    title: "About",
    component: <HomeAbout />,
  },
  {
    id: SectionIds.experience,
    title: "Experience",
    component: <HomeExperience />,
  },
  {
    id: SectionIds.connect,
    title: "Connect",
    description:
      "Open to ad-hoc projects, fractional or full-time contracts from February '25.",
    component: <HomeContact />,
  },
];

const HomePage = () => {
  return (
    <>
      {/* This is needed if the user returns to the page */}
      <WorkSampleDialog />
      <FadeIn className="space-y-12">
        <FadeInItems>
          <HomeIntro />
          {sections.map((section, i) => {
            const { id, title, component, description } = section;

            return (
              <Section key={i} id={id}>
                <SectionHeader>
                  <Heading as="h2" size="h2" className="text-text-strong">
                    {title}
                  </Heading>
                </SectionHeader>
                <SectionBody className="space-y-4">
                  {description && <Paragraph>{description}</Paragraph>}
                  {component}
                </SectionBody>
              </Section>
            );
          })}
        </FadeInItems>
      </FadeIn>
    </>
  );
};

export { HomePage };
