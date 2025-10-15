import { Box } from '@/components/elements/Box';
import Image from 'next/image';

type ProjectThumbnailProps = {
  alt: string;
  slug: string;
};

const ProjectThumbnail = (props: ProjectThumbnailProps) => {
  const { slug, alt } = props;

  return (
    <Box className="group relative block aspect-[3/2] w-full overflow-hidden rounded-xl transition-all duration-300 lg:hover:shadow-2xl lg:hover:shadow-shadow-image-thumb-hover">
      <Image
        src={`/work/${slug}/1.webp`}
        fill
        alt={alt}
        className="object-cover"
        priority
        sizes="(max-width: 1024px) 100vw, 640px"
      />
      <Box className="absolute left-0 top-0 h-full w-0 bg-white opacity-0 transition-all group-active:w-full group-active:opacity-5 lg:hidden" />
    </Box>
  );
};

export { ProjectThumbnail };
