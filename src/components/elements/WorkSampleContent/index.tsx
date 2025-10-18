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
import Image from "next/image";
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
      <WorkSampleAttribute title="Tools">
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
    work: { title, description, href },
  } = useWorkSampleContext();

  const formattedDomain = formatDomain(href);

  return (
    <Container className="flex shrink-0 flex-col gap-12 space-y-5 lg:flex-row">
      <Box className="space-y-12 lg:w-1/2">
        <Box className="space-y-4">
          <Heading as="h1" size="h1" className="text-text-strong">
            {title}
          </Heading>
          <Paragraph className="text-balance text-lg">{description}</Paragraph>
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
    </Container>
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
        <Box className="mx-auto w-full max-w-[1440px] space-y-12">
          <IconButton />
          <WorkSampleSidebar />
          <Container className="markdown max-w-[1400px]">{children}</Container>
        </Box>
      </Box>
    </WorkSampleContext>
  );
};
