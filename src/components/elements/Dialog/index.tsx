'use client';
import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/utils/cn.util';
import { AnimatePresence, Variants } from 'motion/react';
import { motion } from 'motion/react';
import { createContext } from '@/utils/createContext.util';
import { LAYOUT_WRAPPER_ID } from '@/components/layouts/LayoutMain';

type DialogContextProps = Pick<DialogPrimitive.DialogProps, 'open'>;

const [DialogContext, useDialogContext] = createContext<DialogContextProps>();

const Dialog = (props: DialogPrimitive.DialogProps) => {
  const { open } = props;

  React.useEffect(() => {
    const element = document.getElementById(LAYOUT_WRAPPER_ID);

    if (element) {
      if (open) {
        element.style.transform = 'scale(0.98)';
      } else {
        element.style.transform = 'scale(1)';
      }
    }

    return () => {
      if (element) {
        element.style.transform = 'scale(1)';
      }
    };
  }, [open]);

  return (
    <DialogContext value={{ open }}>
      <DialogPrimitive.Root {...props} />
    </DialogContext>
  );
};

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogTitle = DialogPrimitive.Title;

const DialogDescription = DialogPrimitive.Description;

const dialogOverlayVariants: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.25 } },
};

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref} asChild {...props}>
    <motion.div
      variants={dialogOverlayVariants}
      initial="closed"
      animate="open"
      exit="closed"
      className={cn(
        'fixed inset-0 z-50 bg-black/20 backdrop-blur-sm',
        className
      )}
    />
  </DialogPrimitive.Overlay>
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ children, ...props }, ref) => {
  const { open } = useDialogContext();

  return (
    <AnimatePresence>
      {open && (
        <DialogPortal forceMount>
          <DialogOverlay />
          <DialogPrimitive.Content ref={ref} {...props}>
            {children}
          </DialogPrimitive.Content>
        </DialogPortal>
      )}
    </AnimatePresence>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogContent,
};
