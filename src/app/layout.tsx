import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-unleashed.ici-fest.org"),
  title: "AI UNLEASHED — Challenge The Intelligence | ICI Fest 2026",
  description:
    "Official website of AI Unleashed at ICI Fest 2026. Human Minds | Tech Skills | Limitless Possibilities. 60 Teams, 3 Rounds, 1 Final. Organized by ICI Committee, SKIT.",
  keywords: [
    "AI Unleashed",
    "ICI Fest 2026",
    "SKIT Jaipur",
    "AI Quiz",
    "Head-to-Head Solutions",
    "Guess The Prompt",
    "AI Competition",
    "College Tech Fest"
  ],
  authors: [{ name: "ICI Committee, SKIT" }],
  openGraph: {
    title: "AI UNLEASHED — Challenge The Intelligence | ICI Fest 2026",
    description: "60 Teams. 3 Rounds. 1 Final. Human Minds | Tech Skills | Limitless Possibilities.",
    images: ["/poster.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#07111F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#07111F] text-white antialiased selection:bg-[#00E5FF] selection:text-[#07111F]">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
