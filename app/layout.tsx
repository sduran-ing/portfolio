import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/context/LanguageContext";
import BackgroundPattern from "@/components/decor/BackgroundPattern";
import "./globals.css";

// Headings only, used sparingly,
// so we only download the one weight we actually plan to use.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["600"],
});

// Body text everywhere else
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Small labels, nav text, tags. Never used for body
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Santiago Duran - Portfolio",
  description:
    "Portfolio of Santiago Duran, a full-stack developer",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning matters here specifically: next-themes reads
    // localStorage and sets "dark" or "light" as a class on this <html> tag
    // before React hydrates. React would normally complain that the server
    // and client don't match on this one attribute, this tells it that's
    // expected and fine, not a real bug
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>
        {/*
          enableSystem={false} this causes that every first-time visitor gets dark mode regardless of
          their OS setting, and only switches when they click the toggle
        */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>

          {/* The BG needs to be inside ThemeProvider since it reads useTheme().
              Placed first so it sits behind everything else, both in DOM
              order and via its own -z-10. */}
          <BackgroundPattern />

          {/* LanguageProvider wraps the content to allow switching languages */}
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}