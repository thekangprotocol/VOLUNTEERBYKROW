'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, User, Camera, UserCheck, Users, Sparkles, ArrowLeft } from 'lucide-react';
import { LOCATIONS } from '@/lib/data/locations';
import { AppleButton } from '@/components/ui/AppleButton';
import { KrowLogo } from '@/components/ui/KrowLogo';
import { AccountMode } from '@/lib/types/database';

export default function VolunteerOnboardingPage() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [country, setCountry] = useState<string>('Canada');
  const [province, setProvince] = useState<string>('Ontario');
  const [city, setCity] = useState<string>('Toronto');

  const [name, setName] = useState<string>('Alex Mercer');
  const [age, setAge] = useState<string>('22');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [accountMode, setAccountMode] = useState<AccountMode>('myself');

  const [loading, setLoading] = useState(false);

  // Dynamic dropdown mappings
  const availableSubdivisions = Object.keys(LOCATIONS[country]?.subdivisions || {});
  const availableCities = LOCATIONS[country]?.subdivisions[province] || [];

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    setCountry(newCountry);
    const newProvinces = Object.keys(LOCATIONS[newCountry]?.subdivisions || {});
    const firstProvince = newProvinces[0] || '';
    setProvince(firstProvince);
    const newCities = LOCATIONS[newCountry]?.subdivisions[firstProvince] || [];
    setCity(newCities[0] || '');
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProvince = e.target.value;
    setProvince(newProvince);
    const newCities = LOCATIONS[country]?.subdivisions[newProvince] || [];
    setCity(newCities[0] || '');
  };

  const handleFinish = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/volunteer/discover');
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-8 bg-white min-h-screen">
      {/* Header with Step indicator */}
      <div>
        <div className="flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep((step - 1) as 1 | 2)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
          ) : (
            <div className="w-9" />
          )}
          <KrowLogo size="sm" />
          <span className="text-xs font-bold text-krow-brand bg-krow-50 px-3 py-1 rounded-full">
            Step {step} of 3
          </span>
        </div>

        <div className="w-full bg-gray-100 h-1.5 rounded-full mt-4 overflow-hidden">
          <div
            className="bg-krow-brand h-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Dynamic Step Content */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="my-auto py-6 space-y-6"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-krow-50 text-krow-brand rounded-2xl flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Where are you located?</h2>
              <p className="text-xs text-apple-subtext mt-1">
                We will match you with volunteer opportunities near your city.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                  Country
                </label>
                <select
                  value={country}
                  onChange={handleCountryChange}
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-krow-brand focus:ring-2 focus:ring-krow-100"
                >
                  <option value="Canada">Canada 🇨🇦</option>
                  <option value="United States">United States 🇺🇸</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                  {country === 'Canada' ? 'Province / Territory' : 'State'}
                </label>
                <select
                  value={province}
                  onChange={handleProvinceChange}
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-krow-brand focus:ring-2 focus:ring-krow-100"
                >
                  {availableSubdivisions.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                  City
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-krow-brand focus:ring-2 focus:ring-krow-100"
                >
                  {availableCities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="my-auto py-6 space-y-6"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-krow-50 text-krow-brand rounded-2xl flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Your Profile Info</h2>
              <p className="text-xs text-apple-subtext mt-1">Organizers use this to verify registrations.</p>
            </div>

            {/* Profile Picture Upload Preview */}
            <div className="flex flex-col items-center">
              <div className="relative group cursor-pointer">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-2 border-krow-brand" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-krow-brand text-white flex items-center justify-center shadow-apple-purple">
                    <KrowLogo size="md" />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 p-2 bg-gray-900 text-white rounded-full cursor-pointer hover:bg-gray-800 transition-colors shadow-md">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setAvatarUrl(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>
              </div>
              <span className="text-xs text-gray-400 mt-2 font-medium">
                {avatarUrl ? 'Custom Picture Added' : 'Optional (Defaults to Krow Logo)'}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Mercer"
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-krow-brand focus:ring-2 focus:ring-krow-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                  Age
                </label>
                <input
                  type="number"
                  required
                  min="5"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 22"
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-krow-brand focus:ring-2 focus:ring-krow-100"
                />
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="my-auto py-6 space-y-6"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-krow-50 text-krow-brand rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">How will you sign up?</h2>
              <p className="text-xs text-apple-subtext mt-1">Select your profile sign-up type.</p>
            </div>

            <div className="space-y-3">
              <div
                onClick={() => setAccountMode('myself')}
                className={`p-5 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                  accountMode === 'myself'
                    ? 'border-krow-brand bg-krow-50/50 text-gray-900'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <UserCheck className="w-6 h-6 text-krow-brand" />
                  <div>
                    <span className="font-bold text-sm block">Sign up for myself</span>
                    <span className="text-xs text-gray-500">I am volunteering directly</span>
                  </div>
                </div>
                {accountMode === 'myself' && (
                  <div className="w-4 h-4 rounded-full bg-krow-brand" />
                )}
              </div>

              <div
                onClick={() => setAccountMode('parent')}
                className={`p-5 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                  accountMode === 'parent'
                    ? 'border-krow-brand bg-krow-50/50 text-gray-900'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-krow-brand" />
                  <div>
                    <span className="font-bold text-sm block">Sign up as Parent</span>
                    <span className="text-xs text-gray-500">Managing volunteering for youth/children</span>
                  </div>
                </div>
                {accountMode === 'parent' && (
                  <div className="w-4 h-4 rounded-full bg-krow-brand" />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Navigation Button */}
      <div className="pb-4 pt-2">
        {step < 3 ? (
          <AppleButton
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => setStep((step + 1) as 2 | 3)}
          >
            Next Step
          </AppleButton>
        ) : (
          <AppleButton
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleFinish}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 animate-spin" /> Finalizing Profile...
              </span>
            ) : (
              'Complete Setup'
            )}
          </AppleButton>
        )}
      </div>
    </div>
  );
}
