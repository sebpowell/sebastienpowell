import { cn } from "@/utils/cn.util";
import { HTMLMotionProps, motion } from "motion/react";
import { memo, ReactNode, useMemo } from "react";

function TextShimmerComponent<T extends keyof HTMLElementTagNameMap = "div">(
  props: HTMLMotionProps<T> & { as?: T; duration?: number; spread?: number },
) {
  const { as = "div", className, children, duration = 2, spread = 2 } = props;

  const MotionComponent = motion.create(as as keyof HTMLElementTagNameMap);

  const dynamicSpread = useMemo(() => {
    return (children as ReactNode[])?.length * spread;
  }, [children, spread]);

  return (
    <MotionComponent
      className={cn(
        "relative inline-block bg-[length:250%_100%,auto] bg-clip-text",
        "text-transparent [--base-color:#a1a1aa] [--base-gradient-color:#000]",
        "[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]",
        className,
      )}
      initial={{ backgroundPosition: "100% center" }}
      animate={{ backgroundPosition: "0% center" }}
      transition={{
        repeat: Infinity,
        duration,
        ease: "linear",
      }}
      style={
        {
          "--spread": `${dynamicSpread}px`,
          backgroundImage: `var(--bg), linear-gradient(var(--base-color), var(--base-color))`,
        } as React.CSSProperties
      }
    >
      {children}
    </MotionComponent>
  );
}

export const TextShimmer = memo(TextShimmerComponent);
