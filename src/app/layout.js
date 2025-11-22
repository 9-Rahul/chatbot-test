import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Chatbot – Gemini + Next.js",
  description: "A Gemini-powered AI chatbot built with Next.js and MongoDB.",

  openGraph: {
    title: "AI Chatbot – Gemini + Next.js",
    description: "A Gemini-powered AI chatbot built with Next.js and MongoDB.",
    url: "https://chatbot-test-five.vercel.app/",
    siteName: "AI Chatbot",
    images: [
      {
        url: "https://chatbot-test-five.vercel.app/og.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

