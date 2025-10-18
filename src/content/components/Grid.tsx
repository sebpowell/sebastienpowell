// @ts-nocheck
"use client";
import { TextShimmer } from "@/components/elements/Animations/TextShimmer";
import { Box, BoxProps } from "@/components/elements/Box";
import { Button } from "@/components/elements/Button";
import { cn } from "@/utils/cn.util";
import { useState, useEffect } from "react";
import { motion, Variants } from "motion/react";
import { AnimatedDashedBorder } from "@/components/elements/Animations/DashedBorder";
import { Spinner } from "@/content/components/Spinner";
import { useMeasure } from "@uidotdev/usehooks";
import { Interactive } from "@/components/elements/Markdown/Interactive";
export const fadeInUpVariant = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 5, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      type: "spring",
      bounce: 0.3,
      delay,
    },
  },
  exit: {
    opacity: 0,
    y: 40,
    filter: "blur(4px)",
    transition: { duration: 0.3 },
  },
});

export function BackupLocationNasManualTile(props: BoxProps<"button">) {
  const { className, ...rest } = props;

  const [ref, { width, height }] = useMeasure();

  return (
    // <AnimatedDashedBorder className="hover:text-brand text-white/5">
    <BackupLocationTileBase
      as="div"
      type="button"
      ref={ref}
      className={cn(
        className,
        "bg-white/3 hover:bg-brand/6 group relative col-span-12 w-full border-none",
      )}
      {...rest}
    >
      <AnimatedDashedBorder
        width={width || 0}
        height={height || 0}
        active={true}
      />
      <BackupLocationTileIcon className="group-hover:bg-brand/20 flex items-center justify-center rounded-full bg-white/10 transition-transform group-hover:scale-105">
        <div
          className={cn(
            "group-hover:bg-brand flex size-9 items-center justify-center rounded-full bg-white/20",
          )}
        >
          {/* <TbPlus className='text-white' /> */}
        </div>
      </BackupLocationTileIcon>
      <div className="text-12 font-medium text-white/50 transition-colors group-hover:text-white">
        Add
      </div>
    </BackupLocationTileBase>
    // </AnimatedDashedBorder>
  );
}

function BackupLocationTileTitle(props: BoxProps) {
  const { className, ...rest } = props;

  return (
    <h3
      className={cn(
        "text-13 w-full truncate font-medium leading-none",
        className,
      )}
      {...rest}
    />
  );
}

function BackupLocationTileIcon(props: BoxProps) {
  const { className, ...rest } = props;

  return (
    <Box
      className={cn(
        "flex size-[52px] flex-col items-center justify-center",
        className,
      )}
      {...rest}
    />
  );
}

export function BackupLocationLoadingTile() {
  return (
    <BackupLocationTileBase className="cursor-default">
      <BackupLocationTileIcon>
        <Spinner className="size-2" />
      </BackupLocationTileIcon>
      <TextShimmer className="text-12 font-medium text-white/50" duration={1}>
        Loading...
      </TextShimmer>
    </BackupLocationTileBase>
  );
}

export function BackupLocationTileBase<T extends React.ElementType = "div">(
  props: BoxProps<T>,
) {
  const { className, as, ...rest } = props;

  return (
    <Box
      as={as as React.ElementType}
      className={cn(
        "border-hpx flex aspect-[62/55] w-full cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border-white/10 bg-white/5 px-3 text-center outline-none transition-all",
        className,
      )}
      {...rest}
    />
  );
}

export function BackupLocationTileDrive(
  props: Omit<BoxProps<"button">, "type"> & {
    title: string;
    type: any;
    size?: number;
    isSelected: boolean;
  },
) {
  const { isSelected, title, type, className, size, ...rest } = props;

  return (
    <BackupLocationTileBase
      as="button"
      type="button"
      className={cn(
        "ring-brand hover:bg-brand/10 group cursor-pointer hover:ring-2 hover:ring-inset",
        {
          "bg-brand/10 ring-brand ring-2 ring-inset": isSelected,
          "focus:bg-white/10": !isSelected,
          className,
        },
      )}
      {...rest}
    >
      <BackupLocationTileIcon className="transition-all group-hover:scale-105">
        {/* <img src={icon} className="size-16" /> */}
      </BackupLocationTileIcon>
      <BackupLocationTileTitle>{title}</BackupLocationTileTitle>
    </BackupLocationTileBase>
  );
}

// Mock API function that simulates a network request
const mockFetchItems = async (): Promise<
  Array<{
    id: string;
    name: string;
    type: string;
    size?: number;
    isSelected: boolean;
  }>
> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return [
    { id: "1", name: "Drive A", type: "local", size: 1024, isSelected: false },
    {
      id: "2",
      name: "Drive B",
      type: "network",
      size: 2048,
      isSelected: false,
    },
    { id: "3", name: "Drive C", type: "cloud", size: 512, isSelected: true },
    {
      id: "4",
      name: "Drive D",
      type: "external",
      size: 4096,
      isSelected: false,
    },
  ];
};

export const Grid = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<
    Array<{
      id: string;
      name: string;
      type: string;
      size?: number;
      isSelected: boolean;
    }>
  >([]);
  const [originalItems, setOriginalItems] = useState<
    Array<{
      id: string;
      name: string;
      type: string;
      size?: number;
      isSelected: boolean;
    }>
  >([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await mockFetchItems();
      setItems(data);
      setOriginalItems(data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReset = () => {
    console.log("Resetting items to:", originalItems);
    setItems([]);
    setIsLoading(true);

    fetchData();
  };

  const handleItemToggle = (itemId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, isSelected: !item.isSelected } : item,
      ),
    );
  };

  return (
    <Interactive className="flex flex-col">
      <Box className="p-12">
        <Box className={cn("grid w-full grid-cols-3 gap-2.5")}>
          {isLoading && <BackupLocationLoadingTile key="loading" />}

          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeInUpVariant(0.2 * idx)}
            >
              <BackupLocationTileDrive
                title={item.name}
                type={item.type}
                size={item.size}
                onClick={() => handleItemToggle(item.id)}
              />
            </motion.div>
          ))}
        </Box>
      </Box>
      <Box className="flex items-center justify-center border-t p-4">
        <Button onClick={handleReset}>Reset</Button>
      </Box>
    </Interactive>
  );
};
