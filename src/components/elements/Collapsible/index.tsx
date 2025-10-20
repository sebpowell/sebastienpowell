'use client';
import { createContext } from '@/utils/createContext.util';
import { useControlledState } from '@/utils/useControllableState';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { motion } from 'motion/react';

type CollapsibleContextProps = Pick<
  CollapsiblePrimitive.CollapsibleProps,
  'open'
>;

const [CollapsibleContext, useCollapsible] =
  createContext<CollapsibleContextProps>();

const Collapsible = (props: CollapsiblePrimitive.CollapsibleProps) => {
  const { open: openProp, onOpenChange: onOpenChangeProp } = props;

  const [open, setIsOpen] = useControlledState(
    openProp,
    false,
    onOpenChangeProp
  );

  return (
    <CollapsibleContext value={{ open }}>
      <CollapsiblePrimitive.Root
        open={open}
        onOpenChange={setIsOpen}
        {...props}
      />
    </CollapsibleContext>
  );
};

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = (
  props: CollapsiblePrimitive.CollapsibleContentProps
) => {
  const { open } = useCollapsible();

  const { children, ...rest } = props;

  const variants = {
    'accordion-down': {
      height: 'var(--radix-accordion-content-height)',
    },
    'accordion-up': {
      height: 0,
    },
  };

  return (
    <CollapsiblePrimitive.CollapsibleContent asChild {...rest}>
      <motion.div
        initial="accordion-up"
        animate={open ? 'accordion-down' : 'accordion-up'}
        variants={variants}
        transition={{ duration: 0.3, ease: [0.77, 0, 0.175, 1] }}
      >
        {children}
      </motion.div>
    </CollapsiblePrimitive.CollapsibleContent>
  );
};

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
