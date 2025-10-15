import { BoxProps } from '@/components/elements/Box';
import { cn } from '@/utils/cn.util';
import { useLayoutEffect, useRef, useState } from 'react';

export function AnimatedDashedBorder(
  props: BoxProps & { animationDuration?: number; borderRadius?: number }
) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState({ width: 0, height: 0 });

  const {
    borderRadius = 8,
    animationDuration = 1,
    children,
    className,
    ...rest
  } = props;

  const { width, height } = size;

  const strokeWidth = 1;
  const dashArray = '4 4';
  const w = width - strokeWidth;
  const h = height - strokeWidth;

  useLayoutEffect(() => {
    const node = containerRef.current;

    if (!node) return;

    const updateSize = (entries: ResizeObserverEntry[]) => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    };

    const ro = new window.ResizeObserver(updateSize);

    ro.observe(node);

    setSize({ width: node.offsetWidth, height: node.offsetHeight });

    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn('group relative size-full', className)}
      {...rest}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="pointer-events-none absolute inset-0"
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
            transition: 'stroke 0.2s',
          }}
        />
      </svg>
      <div className="relative z-[2] size-full">{children}</div>
      <style>
        {`
					@keyframes dashoffset-move {
						to {
							stroke-dashoffset: -8;
						}
					}
					.group:hover rect {
						animation: dashoffset-move ${animationDuration}s linear infinite;
					}
				`}
      </style>
    </div>
  );
}
