import type { Metadata } from "next";
import Script from "next/script";
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://krishaiworks.com/#organization",
      name: "KrishAIWorks",
      url: "https://krishaiworks.com",
      logo: {
        "@type": "ImageObject",
        url: "https://krishaiworks.com/logo.png",
        width: 512,
        height: 512,
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://krishaiworks.com/#website",
      url: "https://krishaiworks.com",
      name: "KrishAIWorks",
      description:
        "AI-powered tools, productivity utilities, automation, chatbots, websites and custom digital solutions.",
      publisher: {
        "@id": "https://krishaiworks.com/#organization",
      },
      inLanguage: "en",
    },
    {
      "@type": "WebApplication",
      "@id": "https://aistudyassistant.krishaiworks.com/#webapplication",
      name: "AI Study Assistant",
      url: "https://aistudyassistant.krishaiworks.com/",
      description:
        "AI Study Assistant by KrishAIWorks helps students learn, understand topics, summarize study material and improve their productivity with AI.",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires a modern web browser.",
      isPartOf: {
        "@id": "https://krishaiworks.com/#website",
      },
      publisher: {
        "@id": "https://krishaiworks.com/#organization",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://aistudyassistant.krishaiworks.com/#webpage",
      url: "https://aistudyassistant.krishaiworks.com/",
      name: "AI Study Assistant | Study Smarter with AI",
      description:
        "AI Study Assistant by KrishAIWorks helps students learn, understand topics, summarize study material and improve their productivity with AI.",
      isPartOf: {
        "@id": "https://krishaiworks.com/#website",
      },
      about: {
        "@id": "https://aistudyassistant.krishaiworks.com/#webapplication",
      },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BS6TSMM1ZR"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BS6TSMM1ZR');
          `}
        </Script>
      </body>
    </html>
  );
}