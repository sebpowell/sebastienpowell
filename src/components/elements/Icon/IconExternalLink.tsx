import { Box, BoxProps } from "@/components/elements/Box";

const IconExternalLink = (props: BoxProps<"svg">) => {
  return (
    <Box
      as="svg"
      viewBox="0 0 9 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.12132 1.43933L8.12132 1.43933M8.12132 1.43933V6.43933M8.12132 1.43933L1 8.56065"
        stroke="currentColor"
        strokeLinecap="square"
      />
    </Box>
  );
};

export { IconExternalLink };
