"use client";
import { Box } from "@/components/elements/Box";
import { Button, ButtonRotatingText } from "@/components/elements/Button";
import { Container } from "@/components/elements/Container";
import { Heading } from "@/components/elements/Heading";
import { IconButton } from "@/components/elements/IconButton";
import { Paragraph } from "@/components/elements/Paragraph";
import { Engagement } from "@/lib/work";
import { createContext } from "@/utils/createContext.util";
import { formatEngagementDate } from "@/utils/formatDate";
import { formatDomain } from "@/utils/formatDomain";
import Link from "next/link";
import { ReactNode } from "react";

type WorkSampleContextProps = {
  work: Engagement;
};

const [WorkSampleContext, useWorkSampleContext] =
  createContext<WorkSampleContextProps>();

type WorkSampleAttributeProps = {
  title: string;
  children: ReactNode;
};

const WorkSampleAttribute = (props: WorkSampleAttributeProps) => {
  const { title, children } = props;

  return (
    <Box className="space-y-2">
      <Box className="text-text-muted">{title}</Box>
      <Box className="flex-1 text-text-strong">{children}</Box>
    </Box>
  );
};

const WorkSampleDialogMeta = () => {
  const {
    work: { skills = [], capabilities = [], start, end },
  } = useWorkSampleContext();

  return (
    <Box className="space-y-4">
      <WorkSampleAttribute title="Capabilties">
        {capabilities.join(", ")}
      </WorkSampleAttribute>
      <WorkSampleAttribute title="Tools & technologies">
        <Box className="flex flex-wrap gap-2">
          {skills.map((skill, i) => {
            return (
              <Box
                key={i}
                className="rounded-full border px-3 py-2 leading-none"
              >
                {skill}
              </Box>
            );
          })}
        </Box>
      </WorkSampleAttribute>
      <WorkSampleAttribute title="Date">
        {formatEngagementDate({ start, end })}
      </WorkSampleAttribute>
    </Box>
  );
};

const WorkSampleSidebar = () => {
  const {
    work: { title, description, position, href },
  } = useWorkSampleContext();

  const formattedDomain = formatDomain(href);

  return (
    <Box className="flex shrink-0 flex-col gap-12 space-y-5 lg:flex-row">
      <Box className="space-y-4 lg:w-1/2">
        <Link href="/">
          <IconButton as="div" />
        </Link>
        <Box className="space-y-4">
          <Box className="space-y-1">
            <Heading as="h1" size="h1" className="text-text-strong">
              {title}
            </Heading>
            {position}
          </Box>
          <Paragraph className="text-balance">{description}</Paragraph>
        </Box>
        {formattedDomain && (
          <Button asChild className="relative">
            <Box as="a" href={href} target="_blank" rel="noopener noreferrer">
              <ButtonRotatingText label={formattedDomain} />
            </Box>
          </Button>
        )}
      </Box>
      <Box className="lg:w-1/2">
        <WorkSampleDialogMeta />
      </Box>
    </Box>
  );
};

export const WorkSampleContent = (props: {
  work: Engagement;
  children: ReactNode;
}) => {
  const { work, children } = props;

  return (
    <WorkSampleContext value={{ work }}>
      <Box className="py-24">
        <Container variant="lg" className="mx-auto w-full space-y-12">
          <WorkSampleSidebar />
          <Box className="markdown">{children}</Box>
        </Container>
      </Box>
    </WorkSampleContext>
  );
};
