import { Box } from "@/components/elements/Box";
import { Container } from "@/components/elements/Container";
import { Footer } from "@/components/elements/Footer";
import { ReactNode } from "react";

type LayoutMainProps = {
  children: ReactNode;
};

const LAYOUT_WRAPPER_ID = "wrapper";

const LayoutMain = (props: LayoutMainProps) => {
  const { children } = props;

  return (
    <Box
      id={LAYOUT_WRAPPER_ID}
      className="flex flex-1 flex-col transition-all duration-300"
    >
      <Box className="pointer-events-none fixed z-50 h-24 w-full select-none bg-gradient-to-b from-background-surface opacity-95" />
      <Box
        as="main"
        className="relative z-10 flex flex-1 flex-col rounded-b-3xl bg-background-surface shadow-sm"
      >
        <Container className="flex flex-1 flex-col">{children}</Container>
      </Box>
      <Footer />
    </Box>
  );
};

export { LayoutMain, LAYOUT_WRAPPER_ID };
