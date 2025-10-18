
import { Box, BoxProps } from "@/components/elements/Box";
import { HoverEffect } from "@/components/elements/Hover";
import { cn } from "@/utils/cn.util";
import { useClickSound } from "@/utils/useClickSound";
import { motion } from "motion/react";
import Image from "next/image";

type ProjectThumbnailProps = {
  alt: string;
  slug: string;
};

const Clickable = (props: BoxProps) => {
  const { className, children, onClick, ...rest } = props;

  const [play] = useClickSound();

  return (
    <motion.div whileTap={{ scale: 0.98 }}>
      <Box
        as="div"
        className={cn("group relative", className)}
        onClick={(e) => {
          play();
          onClick?.(e);
        }}
        {...rest}
      >
        <HoverEffect/>
        <Box className="relative">{children}</Box>
      </Box>
    </motion.div>
  );
};

const ProjectThumbnail = (props: ProjectThumbnailProps) => {
  const { slug, alt } = props;

  return (
    <Clickable>
      <Box className="group relative block aspect-[3/2] w-full overflow-hidden rounded-xl transition-all duration-300">
        <Image
          src={`/work/${slug}/1.webp`}
          fill
          alt={alt}
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 640px"
        />
      </Box>
    </Clickable>
  );
};

export { ProjectThumbnail };
