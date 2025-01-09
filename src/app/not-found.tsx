"use client";
import { Box } from "@/components/elements/Box";
import { Button } from "@/components/elements/Button";
import { Heading } from "@/components/elements/Heading";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box className="flex flex-1 flex-col items-center justify-center space-y-4">
      <Heading as="h1" size="h1" className="text-text-strong">
        404
      </Heading>
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </Box>
  );
}
