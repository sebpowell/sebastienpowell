"use client";
import { Box } from "@/components/elements/Box";
import { Button, ButtonRotatingText } from "@/components/elements/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/elements/Dialog";
import { Heading } from "@/components/elements/Heading";
import { Paragraph } from "@/components/elements/Paragraph";
import { useAppContext } from "@/contexts/app.context";
import { Engagement } from "@/interfaces/engagement.type";
import { createContext } from "@/utils/createContext.util";
import { formatEngagementDate } from "@/utils/formatDate";
import { formatDomain } from "@/utils/formatDomain";
import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, Variants } from "motion/react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { TapScale } from "@/components/elements/Animations/Tap";
import { useClickSound } from "@/utils/useClickSound";

type WorkSampleImageProps = {
  number: number;
};

const WorkSampleImage = (props: WorkSampleImageProps) => {
  const {
    work: { title, slug },
  } = useWorkSampleContext();

  const { number } = props;

  return (
    <Box className="relative overflow-hidden rounded-2xl bg-black/70">
      <Image
        src={`/work/${slug}/${number}.webp`}
        alt={title}
        width={2000}
        height={1333}
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 1440px"
        priority
      />
    </Box>
  );
};

type WorkSampleAttributeProps = {
  title: string;
  children: ReactNode;
};

const WorkSampleAttribute = (props: WorkSampleAttributeProps) => {
  const { title, children } = props;

  return (
    <Box className="space-y-2">
      <Box className="text-text-muted">{title}</Box>
      <Box className="flex-1 text-text-strong">{children}</Box>
    </Box>
  );
};

type WorkSampleContextProps = {
  work: Engagement;
};

const [WorkSampleContext, useWorkSampleContext] =
  createContext<WorkSampleContextProps>();

const WorkSampleDialogMeta = () => {
  const {
    work: { skills, capabilities, start, end },
  } = useWorkSampleContext();

  return (
    <Box className="space-y-4">
      <WorkSampleAttribute title="Capabilties">
        {capabilities.join(", ")}
      </WorkSampleAttribute>
      <WorkSampleAttribute title="Tools">
        <Box className="flex flex-wrap gap-2">
          {skills.map((skill, i) => {
            return (
              <Box
                key={i}
                className="rounded-full border border-neutral-700/40 px-3 py-2 leading-none"
              >
                {skill}
              </Box>
            );
          })}
        </Box>
      </WorkSampleAttribute>
      <WorkSampleAttribute title="Date">
        {formatEngagementDate({ start, end })}
      </WorkSampleAttribute>
    </Box>
  );
};

const WorkSampleSidebar = () => {
  const {
    work: { title, description, href },
  } = useWorkSampleContext();

  const formattedDomain = formatDomain(href);

  return (
    <Box className="flex shrink-0 flex-col gap-12 space-y-5 lg:flex-row">
      <Box className="space-y-12 lg:w-1/2">
        <Box className="space-y-4">
          <Heading as="h1" size="h1" className="text-text-strong">
            {title}
          </Heading>
          <Paragraph className="text-balance text-lg">{description}</Paragraph>
        </Box>
        {formattedDomain && (
          <Button asChild className="relative">
            <Box as="a" href={href} target="_blank" rel="noopener noreferrer">
              <ButtonRotatingText label={formattedDomain} />
            </Box>
          </Button>
        )}
      </Box>
      <Box className="lg:w-1/2">
        <WorkSampleDialogMeta />
      </Box>
    </Box>
  );
};

const WorkSampleToolbar = () => {
  return (
    <Box className="sticky top-4 z-10 flex justify-end px-4 xl:hidden">
      <WorkSampleClose />
    </Box>
  );
};

const WorkSampleClose = () => {
  const [play] = useClickSound();

  return (
    <DialogPrimitive.Close
      asChild
      className="inline-flex rounded-full bg-white/20 px-3 py-2 text-right text-sm leading-none text-white backdrop-blur-2xl transition-colors duration-500 hover:bg-white/50 hover:text-black"
      onClick={() => play()}
    >
      <Box as={motion.button} whileTap={{ scale: 0.9 }}>
        Close
      </Box>
    </DialogPrimitive.Close>
  );
};

const WorkSampleDialog = () => {
  const { slug } = useParams<{ slug: string }>();

  const router = useRouter();

  const open = !!slug;

  const { engagements } = useAppContext();

  const [selected, setSelected] = useState<Engagement | null>(null);

  useEffect(() => {
    const sample = engagements.find((item) => item.slug === slug);

    if (open && !sample) notFound();

    if (sample) setSelected(sample);
  }, [slug, open, engagements]);

  const handleClose = () => {
    router.back();
  };

  const dialogVariants: Variants = {
    closed: { opacity: 0, y: 10 },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, delay: 0.25 },
    },
  };

  if (!selected) return;

  const { shots } = selected;

  return (
    <WorkSampleContext value={{ work: selected }}>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent asChild forceMount>
          <motion.div
            variants={dialogVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed bottom-0 left-0 z-50 h-screen w-screen overflow-auto bg-neutral-900/95 text-text-body outline-none backdrop-blur-sm dark lg:top-0"
          >
            <VisuallyHidden.Root asChild>
              <DialogTitle>{selected.title}</DialogTitle>
            </VisuallyHidden.Root>
            <VisuallyHidden.Root>
              <DialogDescription>{selected.description}</DialogDescription>
            </VisuallyHidden.Root>
            <Box>
              <Box className="sticky top-8 z-10 hidden justify-end xl:flex">
                <WorkSampleClose />
              </Box>
            </Box>

            <Box className="w-full p-4 pt-24 lg:p-8 lg:pt-32 lg:pb-32">
              <Box className="mx-auto max-w-[1440px] space-y-12">
                <WorkSampleSidebar />
                {/* <Box className="space-y-4 xl:space-y-8"> */}
                  {Array.from({ length: shots }, (_, x) => {
                    return <WorkSampleImage key={x} number={x + 1} />;
                  })}
                </Box>
              {/* </Box> */}
            </Box>
          </motion.div>
        </DialogContent>
      </Dialog>
    </WorkSampleContext>
  );
};

export { WorkSampleDialog };
