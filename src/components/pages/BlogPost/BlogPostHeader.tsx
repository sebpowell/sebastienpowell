import { Heading } from "@/components/elements/Heading";
import Link from "next/link";
import { Undo2 } from "lucide-react";
import { Box } from "@/components/elements/Box";
import { IconButton } from "@/components/elements/IconButton";

export const BlogPostHeader = (props: {
  title: string;
  date: string;
  readingTime: number;
}) => {
  const { title, date, readingTime } = props;

  return (
    <Box as="header" className="space-y-6">
      {/* <Link href="/"> */}
        <IconButton />
      {/* </Link> */}
      <Heading as="h1" size="h1" className="text-2xl text-text-strong">
        {title}
      </Heading>
    </Box>
  );
};
