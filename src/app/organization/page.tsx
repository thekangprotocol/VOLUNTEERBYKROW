'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { KrowLogo } from '@/components/ui/KrowLogo';
import { AppleButton } from '@/components/ui/AppleButton';

export default function OrganizationLandingPage() {
  return (
    <div className="flex-1 flex flex-col justify-between px-8 py-12 bg-white min-h-screen text-center">
      {/* Top Navigation Switcher */}
      <div className="w-full flex items-center justify-between pt-4">
        <span className="text-xs uppercase font-bold tracking-widest text-gray-900 bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-krow-brand" />
          Organizer Studio
        </span>
        <Link
          href="/"
          className="text-xs font-semibold text-gray-500 hover:text-krow-brand transition-colors"
        >
          ← Volunteer Portal
        </Link>
      </div>

      {/* Main Centered Content */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center my-auto"
      >
        <KrowLogo size="xl" />

        <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-gray-900 leading-none">
          Organization
        </h1>
        <p className="text-xl font-bold text-krow-brand tracking-tight mt-1">
          by Krow
        </p>

        <p className="mt-4 text-sm text-apple-subtext max-w-xs leading-relaxed font-medium">
          Recruit passionate volunteers, post opportunity events, and manage community impact seamlessly.
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-3 w-full max-w-xs mx-auto pb-4"
      >
        <Link href="/auth?mode=signup&role=organizer" className="block w-full">
          <AppleButton variant="primary" size="lg" fullWidth>
            Register Organization
          </AppleButton>
        </Link>

        <Link href="/auth?mode=login&role=organizer" className="block w-full">
          <AppleButton variant="secondary" size="lg" fullWidth>
            Organizer Log In
          </AppleButton>
        </Link>

        <div className="pt-2">
          <Link
            href="/"
            className="text-xs font-medium text-gray-500 hover:text-krow-brand transition-colors underline decoration-dotted"
          >
            Looking to volunteer instead? Switch to Volunteer Portal
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
