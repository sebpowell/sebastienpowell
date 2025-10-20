import { Box, BoxProps } from '@/components/elements/Box';

const SectionHeader = (props: BoxProps) => {
  return <Box className="flex items-center justify-between pb-2" {...props} />;
};

const SectionBody = (props: BoxProps) => {
  return <Box {...props} />;
};

const Section = (props: BoxProps) => {
  return <Box {...props} />;
};

export { Section, SectionHeader, SectionBody };
