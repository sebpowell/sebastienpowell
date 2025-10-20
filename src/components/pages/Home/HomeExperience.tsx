import { Box } from "@/components/elements/Box";
import { Button } from "@/components/elements/Button";
import { Heading } from "@/components/elements/Heading";
import { HoverEffect } from "@/components/elements/Hover";
import { Link } from "@/components/elements/Link";
import { ProjectThumbnail } from "@/components/elements/ProjectThumbnail";
import { Engagement } from "@/lib/work";
import { formatEngagementDate } from "@/utils/formatDate";
import { ArrowUpRight } from "lucide-react";
import NextLink from "next/link";
import { sortBy } from "remeda";

type EngagementProps = Engagement;

const EngagementListItem = (props: EngagementProps) => {
  const { title, description, cover, start, end, href, slug, position } = props;

  return (
    <Box className="flex flex-col gap-3 lg:flex-row">
      <Box className="lg:w-[150px]">{formatEngagementDate({ start, end })}</Box>
      <Box className="flex-1 space-y-6">
        <Box className="space-y-4">
          <Box className="space-y-1">
            <Heading
              as="h3"
              size="h3"
              className="flex items-center gap-0.5 text-text-strong"
            >
              <Link
                as="a"
                href={href}
                variant="ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                {title}
              </Link>
              <ArrowUpRight className="size-4" />
            </Heading>
            <Box className="leading-none text-text-muted">{position}</Box>
          </Box>
          <Box>{description}</Box>
        </Box>

        {cover && (
          <NextLink
            href={`/work/${slug}`}
            className="group relative block w-full"
          >
            <HoverEffect className="-inset-2 rounded-[18px] bg-background-surface-interactive" />
            <ProjectThumbnail alt={title} src={cover} />
          </NextLink>
        )}
      </Box>
    </Box>
  );
};

const HomeExperience = ({ work = [] }: { work: Engagement[] }) => {
  const sortedWork = sortBy(work, (engagement) => engagement.start).reverse();

  return (
    <Box className="space-y-8">
      {sortedWork.map((engagement, i) => {
        return <EngagementListItem {...engagement} key={i} />;
      })}
    </Box>
  );
};

export { HomeExperience };
