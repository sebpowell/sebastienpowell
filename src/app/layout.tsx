import "./globals.css";
import { LayoutRoot } from "@/components/layouts/LayoutRoot";
import type { Metadata } from "next";

const title = "Sebastien Powell";

const description = "Product Design & engineering";

export const metadata: Metadata = {
  title: "Sebastien Powell",
  description: "Product Design & engineering",
  twitter: {
    title,
    description,
    images: [
      {
        url: "https://www.sebastienpowell.com/og/twitter.png",
      },
    ],
  },
  openGraph: {
    title,
    description,
    images: [
      {
        url: "https://www.sebastienpowell.com/og/default.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
  work,
}: Readonly<{
  children: React.ReactNode;
  work: React.ReactNode;
}>) {
  return (
    <LayoutRoot>
      {children}
      {work}
    </LayoutRoot>
  );
}
