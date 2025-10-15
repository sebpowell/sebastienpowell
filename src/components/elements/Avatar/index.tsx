import { Box, BoxProps } from '@/components/elements/Box';
import { cn } from '@/utils/cn.util';

export const Avatar = (props: BoxProps) => {
  const { className, ...rest } = props;

  return (
    <Box
      className={cn('size-8 rounded-full bg-neutral-700', className)}
      {...rest}
    />
  );
};
