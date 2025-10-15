"use client";

import { AnimatedDashedBorder } from "@/components/elements/Animations/DashedBorder";
import { Box } from "@/components/elements/Box";
import { Interactive } from "@/components/elements/Markdown/Interactive";
import { useElementSize } from "@/utils/useElementSize";

import { File } from "lucide-react";
import { useState } from "react";
import { useMeasure } from "@uidotdev/usehooks";

export function Dropzone() {
  const [isHovering, setIsHovering] = useState(false);

  const [ref, { width, height }] = useMeasure();

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative p-12"
    >
      <div ref={ref} className="relative p-4">
        {/* Clickable content */}
        <button className="relative z-[2]">Upload files</button>

        {/* Ants overlay, no pointer events */}
        <AnimatedDashedBorder
          svgWidth={width}
          svgHeight={height}
          dashArray="6 3"
          strokeWidth={2}
          borderRadius={10}
          animationDuration={1}
          active={isHovering}
          className="absolute inset-0"
        />
      </div>
    </div>
  );
}
