"use client";

import { AnimatedDashedBorder } from "@/components/elements/Animations/DashedBorder";
import { Box } from "@/components/elements/Box";
import { Interactive } from "@/components/elements/Markdown/Interactive";
import { Upload } from "lucide-react";
import { useMeasure } from "@uidotdev/usehooks";
import { useToggle } from "react-use";

export function Dropzone() {
  const [isHovering, setIsHovering] = useToggle(false);

  const [ref, { width, height }] = useMeasure();

  return (
    <Interactive className="p-12 ">
      <Box
        className="group w-full rounded-xl bg-background-surface-interactive p-1 text-neutral-600 hover:text-purple-500"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Box
          ref={ref}
          className="relative flex cursor-pointer items-center justify-center gap-x-3 p-4"
        >
          <Box className="flex items-center gap-x-2 text-text-muted transition-all group-hover:text-purple-400">
            <Upload className="size-4" />
            <Box className="relative z-[2] text-sm">Drop your files here</Box>
          </Box>

          <AnimatedDashedBorder
            width={width || 0}
            height={height || 0}
            dashArray="4 4"
            strokeWidth={1}
            borderRadius={8}
            animationDuration={1}
            active={isHovering}
          />
        </Box>
      </Box>
    </Interactive>
  );
}
