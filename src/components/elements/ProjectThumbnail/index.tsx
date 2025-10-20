import { Box } from "@/components/elements/Box";
import { Clickable } from "@/components/elements/Clickable";
import Image from "next/image";

type ProjectThumbnailProps = {
  alt: string;
  src: string;
};

const ProjectThumbnail = (props: ProjectThumbnailProps) => {
  const { src, alt } = props;

  return (
    <Clickable>
      <Box className="group relative block aspect-[3/2] w-full overflow-hidden rounded-xl transition-all duration-300">
        <Image
          src={src}
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
