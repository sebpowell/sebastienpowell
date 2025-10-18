import { Box } from "@/components/elements/Box";
import { Container } from "@/components/elements/Container";
import { Heading } from "@/components/elements/Heading";
import { HoverEffect } from "@/components/elements/Hover";
import { Logo } from "@/components/elements/Logo";
import { ProjectThumbnail } from "@/components/elements/ProjectThumbnail";
import { workService } from "@/lib/work";
import Link from "next/link";

export default async function Home() {
  const [work] = await Promise.all([workService.getAllEntries()]);

  return (
    <Box className="py-24">
      <Container>
        <Box>
          <Logo className="w-16" />
          <Box>Work</Box>
          <Box>Menu</Box>
        </Box>

        <Heading as="h1" size="h1" className="text-text-strong">
          Work
        </Heading>
        <Box className="grid grid-cols-12 gap-4">
          {work.map((engagement) => {
            const {
              title,
              description,
              cover,
              start,
              end,
              slug,
              href,
              capabilities,
            } = engagement;

            return (
              <Box className="col-span-12 flex flex-col gap-3">
                {cover && (
                  <Link
                    href={`/work/${slug}`}
                    className="group relative block w-full"
                  >
                    <HoverEffect className="-inset-2 rounded-[18px] bg-background-surface-interactive" />
                    <ProjectThumbnail alt={title} src={cover} />
                  </Link>
                )}
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
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
