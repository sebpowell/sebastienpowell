"use client";
import { Box } from "@/components/elements/Box";
import { HoverEffect } from "@/components/elements/Hover";
import { Interactive } from "@/components/elements/Markdown/Interactive";
import Image from "next/image";
import image from "../../../public/work/voltage-park/1.webp";

export const DemoHoverEffect = () => {
  return (
    <Interactive className="p-12">
      <Box className="group relative block aspect-[3/2] w-full">
        <HoverEffect className="-inset-3 rounded-[24px] bg-background-surface-interactive" />
        <Image
          src={image}
          fill
          alt="test"
          className="relative rounded-xl object-cover"
          priority
        />
      </Box>
    </Interactive>
  );
};
