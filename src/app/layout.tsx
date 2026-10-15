import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LaunchRadar — Autonomous Job & Internship Finder',
  description: 'AI Agent discovery and deterministic matching for college students & freshers across top company career boards.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-yellow-400/30 selection:text-yellow-200">
        {children}
      </body>
    </html>
  );
}
