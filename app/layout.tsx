import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bahasa Belajar",
  description: "Learn Bahasa Indonesia - vocabulary, flashcards, quizzes & reading practice",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream">
        <main className="pb-nav max-w-lg mx-auto px-4">
          {children}
        </main>
        <Navbar />
      </body>
    </html>
  );
}
