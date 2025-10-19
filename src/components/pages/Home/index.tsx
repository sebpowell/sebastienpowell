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
import { HomeIntro } from "@/components/pages/Home/HomeIntro";
import { HomeExperience } from "@/components/pages/Home/HomeExperience";
import { Post } from "@/interfaces/post.type";
import { Box } from "@/components/elements/Box";
import { Container } from "@/components/elements/Container";
import { Engagement } from "@/lib/work";
import { HomeArticles } from "@/components/pages/Home/HomeArticles";
import Link from "next/link";
import { $path } from "next-typesafe-url";

enum SectionIds {
  "about" = "about",
  "experience" = "experience",
  "blog" = "blog",
  "connect" = "connect",
}

const HomePage = ({
  articles,
  work,
}: {
  articles: Post[];
  work: Engagement[];
}) => {
  const sections: {
    id: SectionIds;
    title: string;
    description?: string;
    component: JSX.Element;
    readMore?: {
      label: string;
      href: string;
    };
  }[] = [
    {
      id: SectionIds.about,
      title: "About",
      component: (
        <div className="markdown">
          <HomeAbout />
        </div>
      ),
    },
    {
      id: SectionIds.experience,
      title: "Work",
      component: <HomeExperience work={work} />,
      readMore: {
        label: "See all",
        href: $path({ route: "/work" }),
      },
    },
    {
      id: SectionIds.blog,
      title: "Writing",
      component: <HomeArticles articles={articles} />,
    },
    {
      id: SectionIds.connect,
      title: "Connect",
      description:
        "Open to ad-hoc projects, fractional or full-time contracts.",
      component: <HomeContact />,
    },
  ];

  return (
    <Box className="py-24">
      <Container className="flex flex-1 flex-col space-y-12">
        <HomeIntro />
        {sections.map((section, i) => {
          const { id, title, component, description, readMore } = section;

          return (
            <Section key={i} id={id}>
              <SectionHeader>
                <Heading as="h2" size="h2" className="text-text-strong">
                  {title}
                </Heading>
                {readMore && (
                  <Link
                    href={readMore.href}
                    className="text-text-muted hover:text-text-strong"
                  >
                    {readMore.label}
                  </Link>
                )}
              </SectionHeader>
              <SectionBody className="space-y-4">
                {description && <Paragraph>{description}</Paragraph>}
                {component}
              </SectionBody>
            </Section>
          );
        })}
      </Container>
    </Box>
  );
};

export { HomePage };
