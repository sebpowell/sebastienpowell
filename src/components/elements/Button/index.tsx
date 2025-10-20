import { Box, BoxProps } from "@/components/elements/Box";
import { cn } from "@/utils/cn.util";
import { createContext } from "@/utils/createContext.util";
import { cva } from "class-variance-authority";
import { motion } from "motion/react";
import { useState } from "react";

type ButtonProps = BoxProps<"button">;

type ButtonContextProps = {
  isHovered: boolean;
};

const [ButtonContext, useButtonContext] = createContext<ButtonContextProps>();

type ButtonRotatingTextProps = {
  label: string;
};

const ButtonRotatingText = (props: ButtonRotatingTextProps) => {
  const { label } = props;

  const { isHovered } = useButtonContext();

  return (
    <motion.div className="relative overflow-hidden">
      <motion.div
        animate={{ y: isHovered ? "-100%" : "0%" }}
        transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
      >
        {label}
      </motion.div>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: isHovered ? "0%" : "100%" }}
        transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
        className="absolute top-0"
      >
        {label}
      </motion.div>
    </motion.div>
  );
};

const buttonBaseStyles = cva([
  "h-9 pb-[1px] rounded-full px-4 leading-none font-medium text-sm inline-flex items-center justify-center transition-all duration-300 hover:shadow-button-hover bg-button-primary-background text-button-primary-text",
]);

const buttonVariants = cva(buttonBaseStyles, {
  variants: {
    variant: {
      solid: buttonBaseStyles(),
      outline: buttonBaseStyles(),
    },
  },
});

const Button = (props: ButtonProps) => {
  const { className, ...rest } = props;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <ButtonContext value={{ isHovered }}>
      <Box
        as={motion.button}
        className={cn(buttonBaseStyles(), className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...rest}
      />
    </ButtonContext>
  );
};

export { Button, ButtonRotatingText };
