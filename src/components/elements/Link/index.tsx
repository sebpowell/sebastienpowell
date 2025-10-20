import { Box, BoxProps } from '@/components/elements/Box';
import { cn } from '@/utils/cn.util';
import { cva, VariantProps } from 'class-variance-authority';

const linkStyles = cva(['underline-offset-4'], {
  variants: {
    variant: {
      solid: 'lg:underline',
      ghost: 'lg:hover:underline',
    },
  },
});

type LinkStyles = VariantProps<typeof linkStyles>;

type LinkProps = BoxProps<'a'> & LinkStyles & { external?: boolean };

const Link = (props: LinkProps) => {
  const { className, variant = 'solid', external, ...rest } = props;

  return (
    <Box
      as="a"
      className={cn(linkStyles({ variant }), className)}
      {...(external && {
        rel: 'noopener noreferrer',
      })}
      {...rest}
    />
  );
};

export { Link };
