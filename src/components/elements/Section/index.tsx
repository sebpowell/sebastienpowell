import { Box, BoxProps } from "@/components/elements/Box";

const SectionHeader = (props: BoxProps) => {
  return <Box className="pb-4" {...props} />;
};

const SectionBody = (props: BoxProps) => {
  return <Box {...props} />;
};

const Section = (props: BoxProps) => {
  return <Box {...props} />;
};

export { Section, SectionHeader, SectionBody };
