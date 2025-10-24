import { Box } from "@/components/elements/Box";
import { Container } from "@/components/elements/Container";
import { Logo } from "@/components/elements/Logo";
import { ThemeToggle } from "@/components/elements/ThemeToggle";
import Link from "next/link";

export const Footer = () => {
  return (
    <Box as="footer" className="sticky bottom-0 left-0 z-0 h-20 w-full">
      <Container className="relative flex h-full items-center">
        <ThemeToggle />
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 block w-16 -translate-x-1/2 -translate-y-1/2 text-text-strong"
        >
          <Logo />
        </Link>
      </Container>
    </Box>
  );
};
