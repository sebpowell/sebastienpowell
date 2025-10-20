import { motion, Variants } from 'motion/react';
import { Children } from 'react';

type FadeInItemsProps = {
  children: React.ReactNode;
  initialDelay?: number;
  staggerDelay?: number;
};

const FadeInItems = (props: FadeInItemsProps) => {
  const { children, initialDelay = 0.5, staggerDelay = 0.1 } = props;

  const itemVariants: Variants = {
    initial: { opacity: 0, y: -5 },
    open: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: initialDelay + index * staggerDelay },
    }),
  };

  return Children.map(children, (child, index) => (
    <motion.div
      key={index}
      custom={index}
      variants={itemVariants}
      initial="initial"
      animate="open"
    >
      {child}
    </motion.div>
  ));
};

export { FadeInItems };
