import { Box } from "@/components/elements/Box";
import { Heading } from "@/components/elements/Heading";
import { TapScale } from "@/components/elements/Markdown/components";
import Image from "next/image";

const HomeIntro = () => {
  return (
    <Box className="flex items-center gap-4">
      <TapScale>
        sdfgds
        <Box className="relative size-20 shrink-0 rounded-full">
          <Image
            src="/avatar.png"
            alt="Sebastien Powell"
            fill
            sizes="5rem"
            priority
          />
        </Box>
      </TapScale>
      <Box>
        <Heading as="h1" className="text-text-strong" size="h2">
          Sebastien Powell
        </Heading>
        <Box className="text-text-muted">Product Design &amp; Engineering</Box>
      </Box>
    </Box>
  );
};

export { HomeIntro };
