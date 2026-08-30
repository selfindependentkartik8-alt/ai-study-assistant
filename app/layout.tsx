import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aistudyassistant.krishaiworks.com"),

  title: {
    default: "AI Study Assistant | Study Smarter with AI",
    template: "%s | AI Study Assistant",
  },

  description:
    "AI Study Assistant by KrishAIWorks helps students learn, understand topics, summarize study material and improve their productivity with AI.",

  keywords: [
    "AI Study Assistant",
    "AI study tool",
    "AI for students",
    "study assistant",
    "AI learning tool",
    "AI homework helper",
    "study smarter",
    "student productivity",
    "KrishAIWorks",
  ],

  authors: [
    {
      name: "KrishAIWorks",
      url: "https://krishaiworks.com",
    },
  ],

  creator: "KrishAIWorks",
  publisher: "KrishAIWorks",

  applicationName: "AI Study Assistant",
  category: "education",

  alternates: {
    canonical: "https://aistudyassistant.krishaiworks.com",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aistudyassistant.krishaiworks.com",
    siteName: "AI Study Assistant",
    title: "AI Study Assistant | Study Smarter with AI",
    description:
      "Learn faster and study smarter with the AI Study Assistant by KrishAIWorks.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "AI Study Assistant",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Study Assistant | Study Smarter with AI",
    description:
      "An AI-powered study assistant by KrishAIWorks for students and learners.",
    images: ["/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}