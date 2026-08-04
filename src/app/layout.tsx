import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Volunteer by Krow | Connect & Make an Impact',
  description: 'A modern, Apple-inspired platform connecting passionate volunteers with organizations near you.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F5F5F7] text-gray-900 selection:bg-krow-100 selection:text-krow-brand">
        <main className="min-h-screen flex flex-col items-center">
          <div className="w-full min-h-screen max-w-lg bg-white shadow-2xl relative flex flex-col">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
