"use client";
import { Box } from "@/components/elements/Box";
import { Container } from "@/components/elements/Container";
import { Logo } from "@/components/elements/Logo";
import { ThemeToggle } from "@/components/elements/ThemeToggle";
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
      <Box
        as="main"
        className="relative z-10 flex flex-1 flex-col rounded-b-3xl bg-bg-page py-12 shadow-sm transition-transform duration-300 lg:py-20"
      >
        <Container className="flex flex-1 flex-col">{children}</Container>
      </Box>

      <Box as="footer" className="sticky bottom-0 left-0 z-0 h-20 w-full">
        <Container className="relative h-full">
          <Logo className="absolute left-1/2 top-1/2 w-16 -translate-x-1/2 -translate-y-1/2 text-text-strong" />
          <ThemeToggle />
        </Container>
      </Box>
    </Box>
  );
};

export { LayoutMain, LAYOUT_WRAPPER_ID };
