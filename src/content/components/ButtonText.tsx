"use client";
import { Button, ButtonRotatingText } from "@/components/elements/Button";
import { Interactive } from "@/components/elements/Markdown/Interactive";

export const ButtonText = () => {
  return (
    <Interactive className="p-12">
      <Button className="relative">
        <ButtonRotatingText label="test" />
      </Button>
    </Interactive>
  );
};
