"use client";
import { Box } from "@/components/elements/Box";
import { Container } from "@/components/elements/Container";
import AboutShort from "@/components/pages/About/AboutShort.mdx";
import AboutLong from "@/components/pages/About/AboutLong.mdx";
import { useState } from "react";
import { IconButton } from "@/components/elements/IconButton";
import Link from "next/link";

export const About = () => {
  const [version, setVersion] = useState<"short" | "long">("short");

  return (
    <Box className="py-24">
      <Container className="space-y-6">
        <Link href="/">
          <IconButton as="div" />
        </Link>
        <div className="markdown">
          {version === "short" ? <AboutShort /> : <AboutLong />}
          <Box
            onClick={() => {
              setVersion(version === "short" ? "long" : "short");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            as="button"
            className="text-text-muted transition-colors duration-300 hover:text-text-strong"
          >
            Read the {version === "short" ? "long(er)" : "short(er)"} version
          </Box>
        </div>
      </Container>
    </Box>
  );
};
