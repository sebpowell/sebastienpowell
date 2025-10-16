import { HoverEffect } from "@/components/elements/ArticleList";
import { Box } from "@/components/elements/Box";
import { Heading } from "@/components/elements/Heading";
import { Link } from "@/components/elements/Link";
// import { Markdown } from '@/components/elements/Markdown';
import { ProjectThumbnail } from "@/components/elements/ProjectThumbnail";
import { useAppContext } from "@/contexts/app.context";
import { Engagement } from "@/interfaces/engagement.type";
import NextLink from "next/link";

type EngagementProps = Engagement;

const EngagementListItem = (props: EngagementProps) => {
  const { title, description, start, end, href, capabilities, shots, slug } =
    props;

  return (
    <Box className="flex flex-col gap-3 lg:flex-row">
      <Box className="lg:w-[150px]">
        {start === end ? end : `${start}—${end}`}
      </Box>

      <Box className="flex-1 space-y-6">
        <Box className="space-y-4">
          <Box className="space-y-1">
            <Heading as="h3" size="h3" className="text-text-strong">
              <Link
                as="a"
                href={href}
                variant="ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                {title}
              </Link>
            </Heading>
            <Box className="text-text-muted leading-none">{capabilities.join(", ")}</Box>
          </Box>
          <Box>{description}</Box>
        </Box>

        {shots > 0 && (
          <NextLink
            href={`/work/${slug}`}
            className="group relative block w-full"
          >
            <HoverEffect className="bg-neutral-800" />
            <ProjectThumbnail alt={title} slug={slug} />
          </NextLink>
        )}
      </Box>
    </Box>
  );
};

const HomeExperience = () => {
  const { engagements } = useAppContext();

  return (
    <Box className="space-y-8">
      {engagements.map((engagement, i) => {
        return <EngagementListItem {...engagement} key={i} />;
      })}
    </Box>
  );
};

export { HomeExperience };
