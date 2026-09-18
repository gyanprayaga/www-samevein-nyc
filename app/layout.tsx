import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Chrome } from "@/components/chrome";
import { getContent } from "@/lib/content";
import "./globals.css";

export const dynamic = "force-dynamic";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Same Vein",
    template: "%s · Same Vein",
  },
  description:
    "Brooklyn five-piece. Punk grit, jazz-soul harmony. Live first, then the record.",
};

export default async function RootLayout({
  children,
}: LayoutProps<"/">) {
  const content = await getContent();
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <Chrome
          instagram={content.instagram}
          tvVideo={content.tvVideo}
          tvNote={content.tvNote}
        >
          {children}
        </Chrome>
      </body>
    </html>
  );
}
