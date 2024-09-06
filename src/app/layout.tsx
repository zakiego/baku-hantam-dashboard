import "@/styles/tailwind.css";
import type { Metadata } from "next";
import type React from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    template: "%s - Baku Hantam",
    default: "Baku Hantam",
  },
  description: "",
};

export default async function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
