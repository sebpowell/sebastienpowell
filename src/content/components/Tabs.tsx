import { AnimatedBackground } from "@/components/elements/Animations/AnimatedBackground";
import { Box } from "@/components/elements/Box";
import { Interactive } from "@/components/elements/Markdown/Interactive";

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

  return (
    <Interactive className="p-12">
      <Box className="rounded-full border p-1">
        <AnimatedBackground
          defaultValue={tabs[0].id}
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
                className="inline-flex h-10 cursor-pointer items-center justify-center px-5"
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
