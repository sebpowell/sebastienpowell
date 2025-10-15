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
      <Box className="fixed top-0 z-20 h-12 w-full bg-gradient-to-b from-bg-page to-bg-page/0" />
      <Box
        as="main"
        className="relative z-10 flex flex-1 flex-col rounded-b-3xl bg-bg-page py-12 shadow-sm transition-transform duration-300 lg:py-20"
      >
        <Container className="flex flex-1 flex-col">{children}</Container>
      </Box>
      <Footer />
    </Box>
  );
};

export { LayoutMain, LAYOUT_WRAPPER_ID };
