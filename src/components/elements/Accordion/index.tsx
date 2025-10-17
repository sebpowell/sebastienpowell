"use client";

import { cn } from "@/utils/cn.util";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import * as React from "react";
import { mergeRefs } from "react-merge-refs";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-center justify-between py-4 text-left text-sm transition-all [&[data-state=open]>svg]:rotate-90",
        className,
      )}
      {...props}
    >
      {children}
      <span className="ml-2 flex items-center">
        <span className="group-data-[state=open]:hidden">+</span>
        <span className="hidden group-data-[state=open]:inline">_</span>
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, forwardedRef) => {
  const contentRef = React.useRef<HTMLDivElement>(null);

  const [height, setHeight] = React.useState<string>("0px");

  const [isOpen, setIsOpen] = React.useState(false);

  const localRef = React.useRef<HTMLElement>(null);

  const setRefs = React.useCallback(mergeRefs([localRef, forwardedRef]), [
    forwardedRef,
  ]);

  React.useEffect(() => {
    const element = localRef.current;
    const content = contentRef.current;

    if (!element || !content) return;

    const updateHeight = () => {
      if (isOpen && content) {
        setHeight(`${content.scrollHeight}px`);
      }
    };

    const handleStateChange = () => {
      const isOpenState = element.getAttribute("data-state") === "open";
      setIsOpen(isOpenState);
      if (isOpenState && content) {
        setHeight(`${content.scrollHeight}px`);
      } else {
        setHeight("0px");
      }
    };

    handleStateChange();

    const stateObserver = new MutationObserver(handleStateChange);
    stateObserver.observe(element, {
      attributes: true,
      attributeFilter: ["data-state"],
    });

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(content);

    return () => {
      stateObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [isOpen]);

  return (
    <AccordionPrimitive.Content
      ref={setRefs}
      forceMount
      className={cn("overflow-hidden transition-all duration-300")}
      style={{
        maxHeight: isOpen ? height : "0px",
        opacity: isOpen ? 1 : 0,
      }}
      {...props}
    >
      <div ref={contentRef} className={cn("pb-4 pt-0 text-sm", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
});
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
