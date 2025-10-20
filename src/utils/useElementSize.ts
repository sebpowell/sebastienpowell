import { useLayoutEffect, useRef, useState } from "react";

export type ElementSize = { width: number; height: number };

export function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const updateSize = (entries: ResizeObserverEntry[]) => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    };

    const ro = new window.ResizeObserver(updateSize);
    ro.observe(node);

    // Initialize immediately
    setSize({ width: node.offsetWidth, height: node.offsetHeight });

    return () => ro.disconnect();
  }, []);

  return { ref, size } as const;
}


