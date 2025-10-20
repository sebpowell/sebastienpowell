"use client";

import { Box } from "@/components/elements/Box";
import { cn } from "@/utils/cn.util";
import { useAccordionHeight } from "@/utils/useAccordionHeight";
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
        "group flex flex-1 items-center justify-between py-4 text-left transition-all text-text-strong",
        className,
      )}
      {...props}
    >
      {children}

      <Plus className="size-5 group-data-[state=open]:hidden" />
      <Minus className="hidden size-5 group-data-[state=open]:inline" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

const AccordionContent = ({
  className,
  children,
  ...props
}: AccordionPrimitive.AccordionContentProps) => {
  const { contentRef, triggerRef, height } = useAccordionHeight();

  return (
    <AccordionPrimitive.Content
      ref={triggerRef}
      forceMount
      className={cn("overflow-hidden transition-all duration-300")}
      style={{
        maxHeight: height,
        opacity: height === "0px" ? 0 : 1,
      }}
      {...props}
    >
      <Box ref={contentRef} className={cn("pb-4 pt-0", className)}>
        {children}
      </Box>
    </AccordionPrimitive.Content>
  );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
