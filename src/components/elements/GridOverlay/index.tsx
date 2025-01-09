import { Container } from "@/components/elements/Container";

const GridOverlay = () => {
  return (
    <Container
      className="fixed left-1/2 top-0 h-screen -translate-x-1/2"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, rgba(255, 0, 0, 0.1), rgba(255, 0, 0, 0.1) calc((100% - 11 * 24px) / 12), transparent calc((100% - 11 * 24px) / 12), transparent calc((100% - 11 * 24px) / 12 + 24px))",
      }}
    />
  );
};

export { GridOverlay };
