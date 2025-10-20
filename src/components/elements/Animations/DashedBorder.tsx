import { BoxProps } from "@/components/elements/Box";
import { cn } from "@/utils/cn.util";

type AnimatedDashedBorderProps = Omit<BoxProps<"svg">, "width" | "height"> & {
  animationDuration?: number;
  borderRadius?: number;
  dashArray?: string;
  strokeWidth?: number;
  width?: number;
  height?: number;
  active?: boolean;
};

export function AnimatedDashedBorder(props: AnimatedDashedBorderProps) {
  const {
    borderRadius = 8,
    animationDuration = 1,
    dashArray = "4 4",
    strokeWidth = 1,
    width = 0,
    height = 0,
    active = false,
    className,
    ...rest
  } = props;

  const rectWidth = width - strokeWidth;

  const rectHeight = height - strokeWidth;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("pointer-events-none absolute inset-0", className)}
      {...rest}
    >
      <rect
        x={strokeWidth / 2}
        y={strokeWidth / 2}
        width={rectWidth}
        height={rectHeight}
        rx={borderRadius}
        ry={borderRadius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        style={{
          transition: "stroke 0.2s",
          animation: active
            ? `dashoffset-move ${animationDuration}s linear infinite`
            : undefined,
        }}
      />
      <style>
        {`
					@keyframes dashoffset-move {
						to {
							stroke-dashoffset: -8; 
						}
					}
				`}
      </style>
    </svg>
  );
}
