import { useMeasure } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";

interface UseAccordionHeightReturn {
  /** Ref for the accordion content element */
  contentRef: React.RefCallback<HTMLDivElement>;
  /** Ref for the accordion trigger element */
  triggerRef: React.RefObject<HTMLDivElement | null>;
  /** Current height value for styling */
  height: string;
}

export const useAccordionHeight = (): UseAccordionHeightReturn => {
  const [height, setHeight] = useState<string>("0px");

  const triggerRef = useRef<HTMLDivElement>(null);

  const [contentRef, { height: measuredHeight }] = useMeasure<HTMLDivElement>();

  useEffect(() => {
    const trigger = triggerRef.current;

    if (!trigger) return;

    const handleStateChange = () => {
      const isOpen = trigger.getAttribute("data-state") === "open";

      if (isOpen && measuredHeight !== null) {
        setHeight(`${measuredHeight}px`);
      } else {
        setHeight("0px");
      }
    };

    // Initial state check
    handleStateChange();

    // Watch for state changes
    const stateObserver = new MutationObserver(handleStateChange);

    stateObserver.observe(trigger, {
      attributes: true,
      attributeFilter: ["data-state"],
    });

    return () => stateObserver.disconnect();
  }, [measuredHeight]);

  return { contentRef, triggerRef, height };
};
