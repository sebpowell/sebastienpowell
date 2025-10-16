"use client";

import { AnimatedDashedBorder } from "@/components/elements/Animations/DashedBorder";
import { Box } from "@/components/elements/Box";
import { Interactive } from "@/components/elements/Markdown/Interactive";
import { useElementSize } from "@/utils/useElementSize";

import { File, Upload } from "lucide-react";
import { useState } from "react";
import { useMeasure } from "@uidotdev/usehooks";
import { Icon } from "@/components/elements/Icon";

export function Dropzone() {
  const [isHovering, setIsHovering] = useState(false);

  const [ref, { width, height }] = useMeasure();

  return (
    <Interactive>
      <div className="bg-background-surface-interactive rounded-xl p-1">
        <div
          ref={ref}
          className="text-border-strong relative flex cursor-pointer items-center gap-x-3 p-4 hover:text-purple-500"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Box className="text-text-strong">
            <Upload className="size-5" />
            <Box className="relative z-[2]">Drop your files here</Box>
          </Box>

          <AnimatedDashedBorder
            svgWidth={width}
            svgHeight={height}
            dashArray="4 4"
            strokeWidth={1}
            borderRadius={10}
            animationDuration={1}
            active={isHovering}
            className="absolute inset-0"
          />
        </div>
      </div>
    </Interactive>
  );
}
