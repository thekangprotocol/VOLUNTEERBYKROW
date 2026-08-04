'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, Building2, CheckCircle2 } from 'lucide-react';
import { KrowLogo } from '@/components/ui/KrowLogo';
import { AppleButton } from '@/components/ui/AppleButton';
import { UserRole } from '@/lib/types/database';

export default function AccountTypePage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>('volunteer');
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (selectedRole === 'volunteer') {
        router.push('/onboarding/volunteer');
      } else {
        router.push('/onboarding/organizer');
      }
    }, 400);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-12 bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <KrowLogo size="md" />
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mt-6">
          Choose your account type
        </h1>
        <p className="text-sm text-apple-subtext mt-1.5 max-w-xs">
          Select how you want to use Volunteer by Krow. You can manage your account anytime.
        </p>
      </div>

      {/* Cards Selection */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 my-auto py-6"
      >
        {/* Volunteer Card Option */}
        <div
          onClick={() => setSelectedRole('volunteer')}
          className={`relative p-6 rounded-3xl border-2 transition-all cursor-pointer ${
            selectedRole === 'volunteer'
              ? 'border-krow-brand bg-krow-50/50 shadow-apple-purple'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="p-3.5 rounded-2xl bg-krow-brand text-white shadow-md">
              <Heart className="w-7 h-7" />
            </div>
            {selectedRole === 'volunteer' && (
              <CheckCircle2 className="w-6 h-6 text-krow-brand" />
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mt-4">Volunteer</h3>
          <p className="text-sm text-gray-600 mt-1">
            Discover meaningful causes, join community events near you, and track your impact.
          </p>
        </div>

        {/* Organizer Card Option */}
        <div
          onClick={() => setSelectedRole('organizer')}
          className={`relative p-6 rounded-3xl border-2 transition-all cursor-pointer ${
            selectedRole === 'organizer'
              ? 'border-krow-brand bg-krow-50/50 shadow-apple-purple'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="p-3.5 rounded-2xl bg-gray-900 text-white shadow-md">
              <Building2 className="w-7 h-7" />
            </div>
            {selectedRole === 'organizer' && (
              <CheckCircle2 className="w-6 h-6 text-krow-brand" />
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mt-4">Organizer</h3>
          <p className="text-sm text-gray-600 mt-1">
            Create volunteer opportunities, recruit passionate people, and manage event signups.
          </p>
        </div>
      </motion.div>

      {/* Continue Button */}
      <div className="pb-4">
        <AppleButton
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleContinue}
          disabled={loading}
        >
          {loading ? 'Saving Preference...' : 'Continue'}
        </AppleButton>
      </div>
    </div>
  );
}
