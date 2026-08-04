'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { KrowLogo } from '@/components/ui/KrowLogo';
import { AppleButton } from '@/components/ui/AppleButton';

export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col justify-between px-8 py-16 bg-white min-h-screen text-center">
      {/* Top Spacer */}
      <div className="w-full flex justify-center pt-8">
        <span className="text-xs uppercase font-semibold tracking-widest text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
          Apple Inspired Simplicity
        </span>
      </div>

      {/* Main Centered Content */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center my-auto"
      >
        <KrowLogo size="xl" />

        <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-gray-900 leading-none">
          Volunteer
        </h1>
        <p className="text-xl font-medium text-krow-brand tracking-tight mt-1">
          by Krow
        </p>

        <p className="mt-6 text-base text-apple-subtext max-w-xs leading-relaxed font-normal">
          Find meaningful volunteer opportunities near you.
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4 w-full max-w-xs mx-auto pb-6"
      >
        <Link href="/auth?mode=signup" className="block w-full">
          <AppleButton variant="primary" size="lg" fullWidth>
            Sign Up
          </AppleButton>
        </Link>

        <Link href="/auth?mode=login" className="block w-full">
          <AppleButton variant="secondary" size="lg" fullWidth>
            Log In
          </AppleButton>
        </Link>
      </motion.div>
    </div>
  );
}
