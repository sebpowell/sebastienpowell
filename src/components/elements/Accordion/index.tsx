"use client";

import { cn } from "@/utils/cn.util";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";

import * as React from "react";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = ({
  className,
  ...props
}: AccordionPrimitive.AccordionItemProps) => (
  <AccordionPrimitive.Item className={cn("border-b", className)} {...props} />
);

const AccordionTrigger = ({
  className,
  children,
  ...props
}: AccordionPrimitive.AccordionTriggerProps) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      className={cn(
        "group flex flex-1 items-center justify-between py-4 text-left transition-all [&[data-state=open]>svg]:rotate-90",
        className,
      )}
      {...props}
    >
      {children}
      <span className="flex items-center">
        <Plus className="group-data-[state=open]:hidden" />
        <Minus className="hidden group-data-[state=open]:inline" />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

const AccordionContent = ({
  className,
  children,
  ...props
}: AccordionPrimitive.AccordionContentProps) => {
  const [height, setHeight] = React.useState<string>("0px");

  const [isOpen, setIsOpen] = React.useState(false);

  const elementRef = React.useRef<HTMLDivElement>(null);

  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = elementRef.current;
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
      ref={elementRef}
      forceMount
      className={cn("overflow-hidden transition-all duration-300")}
      style={{
        maxHeight: isOpen ? height : "0px",
        opacity: isOpen ? 1 : 0,
      }}
      {...props}
    >
      <div ref={contentRef} className={cn("pb-4 pt-0", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
