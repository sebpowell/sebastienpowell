import { Box, BoxProps } from "@/components/elements/Box";
import { cn } from "@/utils/cn.util";

export function AnimatedDashedBorder(
  props: BoxProps & {
    animationDuration?: number;
    borderRadius?: number;
    dashArray?: string;
    strokeWidth?: number;
    svgWidth?: number;
    svgHeight?: number;
    active?: boolean;
  },
) {
  const {
    borderRadius = 8,
    animationDuration = 1,
    dashArray = "4 4",
    strokeWidth = 1,
    svgWidth,
    svgHeight,
    active = false,
    children,
    className,
    ...rest
  } = props;

  const measuredWidth = svgWidth ?? 0;
  const measuredHeight = svgHeight ?? 0;
  const w = measuredWidth - strokeWidth;
  const h = measuredHeight - strokeWidth;
  return (
    <svg
      width={measuredWidth}
      height={measuredHeight}
      viewBox={`0 0 ${measuredWidth} ${measuredHeight}`}
      className={cn("group pointer-events-none absolute inset-0", className)}
    >
      <rect
        x={strokeWidth / 2}
        y={strokeWidth / 2}
        width={w}
        height={h}
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
