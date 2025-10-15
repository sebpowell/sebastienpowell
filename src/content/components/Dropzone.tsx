"use client";

import { AnimatedDashedBorder } from "@/components/elements/Animations/DashedBorder";

export function Dropzone() {
  return (
    <div className="w-full rounded-lg border bg-yellow-200 p-4">
      <AnimatedDashedBorder>
        <div className="p-3 text-center">Upload files</div>
      </AnimatedDashedBorder>
    </div>
  );
}
