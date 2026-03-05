import "./globals.css";
import type { Metadata } from "next";
import { Floaters } from "@/components/floaters";

export const metadata: Metadata = {
  title: "Mushee • Futuristic Identity Graph",
  description: "A futuristic, gasless-first identity & contribution dashboard powered by The Graph.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="noise" />
        <div className="gridlines" />
        <Floaters />
        {children}
      </body>
    </html>
  );
}
