"use client";
import { cn } from "@/utils/cn.util";
import { AnimatePresence, motion, Transition } from "motion/react";
import {
  Children,
  cloneElement,
  HTMLAttributes,
  ReactElement,
  useId,
  useState,
} from "react";

type ChildWithDataId = ReactElement<
  HTMLAttributes<HTMLElement> & { "data-id": string }
>;

export type AnimatedBackgroundProps = {
  children: ChildWithDataId | ChildWithDataId[];
  value?: string | null;
  defaultValue?: string;
  onValueChange?: (newActiveId: string | null) => void;
  transition?: Transition;
  enableHover?: boolean;
  className?: string;
};

export function AnimatedBackground({
  children,
  value,
  defaultValue,
  onValueChange,
  className,
  transition,
  enableHover = false,
}: AnimatedBackgroundProps) {
  const [internalActiveId, setInternalActiveId] = useState<string | null>(
    defaultValue || null,
  );
  const uniqueId = useId();

  const activeId = value !== undefined ? value : internalActiveId;

  const setActive = (id: string | null) => {
    if (value === undefined) {
      setInternalActiveId(id);
    }
    onValueChange?.(id);
  };

  const getChildProps = (child: ChildWithDataId) => {
    const { className: childClassName, "data-id": id, ...rest } = child.props;

    const isActive = activeId === id;

    const interactionProps = enableHover
      ? {
          onMouseEnter: () => setActive(id),
          onMouseLeave: () => setActive(null),
        }
      : { onClick: () => setActive(id) };

    return {
      key: id,
      className: cn("relative inline-flex", childClassName),
      "data-active": isActive ? "true" : "false",
      isActive,
      ...interactionProps,
      ...rest,
    };
  };

  return (
    <>
      {Children.map(children, (child) => {
        const props = getChildProps(child);

        const { isActive, ...restProps } = props;

        return cloneElement(
          child,
          restProps,
          <>
            <AnimatePresence initial={false}>
              {isActive && (
                <motion.div
                  layoutId={`background-${uniqueId}`}
                  className={cn("absolute inset-0", className)}
                  transition={transition}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>
            <div className="z-10">{child.props.children}</div>
          </>,
        );
      })}
    </>
  );
}
