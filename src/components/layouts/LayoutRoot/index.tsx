import { Providers } from "@/app/providers";
import { LayoutMain } from "@/components/layouts/LayoutMain";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const LayoutRoot = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`flex min-h-screen flex-1 flex-col bg-bg-root font-sans text-text-body antialiased transition-transform selection:bg-selection-background selection:text-selection-text ${inter.variable} scroll-smooth text-base`}
      >
        <Providers>
          <LayoutMain>{children}</LayoutMain>
        </Providers>
      </body>
    </html>
  );
};

export { LayoutRoot };
