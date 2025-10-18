import { BoxProps } from "@/components/elements/Box";

export function Spinner(props: BoxProps) {
    return (
      <div className="spinner size-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} />
        ))}
        <style>{`
          @keyframes --blink {
            50% { opacity: 0; }
          }
          .spinner {
            display: grid;
            place-items: center;
            container-type: size;
          }
          .spinner > div {
            --sibling-count: 12;
            --blink-duration: 0.12s;
            --height: 100cqmin;
            grid-area: 1 / 1;
            width: calc(var(--height) / 16);
            height: var(--height);
            border-top: calc(var(--height) / 4) solid;
            rotate: calc(var(--sibling-index) * 1turn / var(--sibling-count));
            animation:
              --blink
              calc(var(--sibling-count) * var(--blink-duration))
              calc((var(--sibling-index) - var(--sibling-count)) * var(--blink-duration))
              infinite;
          }
          .spinner > div:nth-child(1) { --sibling-index: 1; }
          .spinner > div:nth-child(2) { --sibling-index: 2; }
          .spinner > div:nth-child(3) { --sibling-index: 3; }
          .spinner > div:nth-child(4) { --sibling-index: 4; }
          .spinner > div:nth-child(5) { --sibling-index: 5; }
          .spinner > div:nth-child(6) { --sibling-index: 6; }
          .spinner > div:nth-child(7) { --sibling-index: 7; }
          .spinner > div:nth-child(8) { --sibling-index: 8; }
          .spinner > div:nth-child(9) { --sibling-index: 9; }
          .spinner > div:nth-child(10) { --sibling-index: 10; }
          .spinner > div:nth-child(11) { --sibling-index: 11; }
          .spinner > div:nth-child(12) { --sibling-index: 12; }
        `}</style>
      </div>
    );
  }