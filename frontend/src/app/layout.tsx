import "@/styles/globals.css";
import "katex/dist/katex.min.css";

import { type Metadata } from "next";

import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "NOVA - 突破性技术情报局",
  description: "Breakthrough Technology Intelligence Agency",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressContentEditableWarning suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
