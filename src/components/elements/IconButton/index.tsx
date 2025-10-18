import { Box } from "@/components/elements/Box";
import { Undo2 } from "lucide-react";
import Link from "next/link";

export const IconButton = () => {
  return (
    <Link href="/">
      <Box className="flex size-10 items-center justify-center rounded-full bg-background-surface-interactive">
        <Undo2 className="size-4" />
      </Box>
    </Link>
  );
};
