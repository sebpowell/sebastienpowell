import { HTMLMotionProps, Variants, motion } from "motion/react";

const FadeIn = (props: HTMLMotionProps<"div">) => {
  const variants: Variants = {
    initial: {
      opacity: 0,
      y: -5,
      filter: "blur(5px)",
    },
    end: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="end"
      exit="initial"
      {...props}
    />
  );
};

export { FadeIn };
