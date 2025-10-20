import { Box, BoxProps } from '@/components/elements/Box';

const Paragraph = (props: BoxProps<'p'>) => {
  return <Box as="p" className="leading-normal" {...props} />;
};

export { Paragraph };
