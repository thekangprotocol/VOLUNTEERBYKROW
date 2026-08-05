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
      <body className="min-h-screen bg-[#F5F5F7] text-gray-900 selection:bg-krow-100 selection:text-krow-brand font-sans antialiased">
        <main className="min-h-screen flex flex-col items-center justify-start md:py-6 md:px-4">
          <div className="w-full min-h-screen md:min-h-[92vh] max-w-lg md:max-w-2xl lg:max-w-4xl bg-white shadow-2xl md:rounded-[36px] border border-black/[0.04] relative flex flex-col overflow-hidden transition-all duration-300">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
