import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LaunchRadar — TinyFish-powered Job & Internship Finder',
  description: 'AI Agent discovery and deterministic matching for college students & freshers across top company career boards.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
        {children}
      </body>
    </html>
  );
}
