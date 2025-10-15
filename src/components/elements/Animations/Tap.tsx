export const TapScale = (
    props: PropsWithChildren<HTMLMotionProps<"button">>,
  ) => {
    return (
      <Box
        as={motion.div}
        whileTap={{ scale: 0.9 }}
        {...props}
      >
        {props.children}
      </Box>
    );
  };