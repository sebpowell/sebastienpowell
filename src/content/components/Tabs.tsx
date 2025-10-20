"use client"
import { AnimatedBackground } from "@/components/elements/Animations/AnimatedBackground";
import { Box } from "@/components/elements/Box";
import { Interactive } from "@/components/elements/Markdown/Interactive";
import { useState } from "react";

export const Tabs = () => {
  const tabs = [
    {
      id: "tab-1",
      label: "Tab 1",
    },
    {
      id: "tab-2",
      label: "Tab 2",
    },
    {
      id: "tab-3",
      label: "Tab 3",
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <Interactive className="p-12">
      <Box className="rounded-full border p-1 w-full flex">
        <AnimatedBackground
          value={activeTab}
          onValueChange={(id) => id && setActiveTab(id)}
          className="rounded-full bg-background-surface-interactive"
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.3,
          }}
        >
          {tabs.map((tab) => {
            const { id, label } = tab;

            return (
              <Box
                key={id}
                data-id={id}
                className="inline-flex flex-1 h-10 cursor-pointer items-center justify-center px-5 text-sm font-medium transition-colors data-[active=true]:text-foreground data-[active=false]:text-muted-foreground"
              >
                {label}
              </Box>
            );
          })}
        </AnimatedBackground>
      </Box>
    </Interactive>
  );
};
