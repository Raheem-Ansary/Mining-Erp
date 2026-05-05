import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { RoleProvider } from "@/components/providers/RoleProvider";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin-ext"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ERP معادن و پروسس",
  description: "سیستم ماژولار ERP برای معدن و پروسس",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="min-h-dvh font-sans">
        <LocaleProvider>
          <RoleProvider>{children}</RoleProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
