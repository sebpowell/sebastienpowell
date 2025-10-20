"use client";
import { Button, ButtonRotatingText } from "@/components/elements/Button";
import { Interactive } from "@/components/elements/Markdown/Interactive";

export const ButtonText = () => {
  return (
    <Interactive className="p-12 flex items-center justify-center">
      <Button className="relative">
        <ButtonRotatingText label="Hover me" />
      </Button>
    </Interactive>
  );
};
