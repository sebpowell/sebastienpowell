import { Box } from "@/components/elements/Box";
import { Heading } from "@/components/elements/Heading";
import { HoverEffect } from "@/components/elements/Hover";
import { Link } from "@/components/elements/Link";
import { ProjectThumbnail } from "@/components/elements/ProjectThumbnail";
import { Engagement } from "@/lib/work";
import NextLink from "next/link";

type EngagementProps = Engagement;

const EngagementListItem = (props: EngagementProps) => {
  const { title, description, cover, href, capabilities = [], slug } = props;

  return (
    <Box className="flex flex-col gap-3 lg:flex-row">
      <Box className="lg:w-[150px]">
        {/* {start === end ? end : `${start}—${end}`} */}
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
            <Box className="leading-none text-text-muted">
              {capabilities.join(", ")}
            </Box>
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

  console.log(work);
  return (
    <Box className="space-y-8">
      {work.map((engagement, i) => {
        return <EngagementListItem {...engagement} key={i} />;
      })}
    </Box>
  );
};

export { HomeExperience };
