'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Building2, Plus, Trash2, Upload, Sparkles, MapPin, AlignLeft } from 'lucide-react';
import { KrowLogo } from '@/components/ui/KrowLogo';
import { AppleButton } from '@/components/ui/AppleButton';

export default function OrganizerOnboardingPage() {
  const router = useRouter();

  const [orgName, setOrgName] = useState('Krow Community Action');
  const [description, setDescription] = useState(
    'Empowering local neighborhoods through environmental and youth support programs.'
  );
  const [location, setLocation] = useState('Toronto, Ontario, Canada');
  const [organizers, setOrganizers] = useState<string[]>(['Sarah Jenkins', 'Marcus Vance']);
  const [newOrganizerInput, setNewOrganizerInput] = useState('');

  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAddOrganizer = () => {
    if (newOrganizerInput.trim()) {
      setOrganizers([...organizers, newOrganizerInput.trim()]);
      setNewOrganizerInput('');
    }
  };

  const handleRemoveOrganizer = (index: number) => {
    setOrganizers(organizers.filter((_, i) => i !== index));
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push('/organizer/posts');
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-8 bg-white min-h-screen">
      {/* Header */}
      <div className="text-center">
        <KrowLogo size="sm" />
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mt-4">
          Setup Your Organization
        </h1>
        <p className="text-xs text-apple-subtext mt-1">
          Provide organization details so volunteers can learn about your mission.
        </p>
      </div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleFinish}
        className="space-y-5 my-auto py-6"
      >
        {/* Logo & Banner Upload row */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
            Branding (Logo & Banner)
          </label>
          <div className="grid grid-cols-2 gap-3">
            {/* Logo */}
            <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="w-12 h-12 rounded-full object-cover" />
              ) : (
                <>
                  <Upload className="w-6 h-6 text-gray-400 mb-1" />
                  <span className="text-xs font-semibold text-gray-700">Upload Logo</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setLogoUrl(URL.createObjectURL(file));
                }}
              />
            </div>

            {/* Banner */}
            <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
              {bannerUrl ? (
                <img src={bannerUrl} alt="Banner" className="w-full h-12 rounded-lg object-cover" />
              ) : (
                <>
                  <Upload className="w-6 h-6 text-gray-400 mb-1" />
                  <span className="text-xs font-semibold text-gray-700">Banner (Optional)</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setBannerUrl(URL.createObjectURL(file));
                }}
              />
            </div>
          </div>
        </div>

        {/* Organization Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
            Organization Name
          </label>
          <div className="relative">
            <Building2 className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              required
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="e.g. Krow Community Action"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-krow-brand focus:ring-2 focus:ring-krow-100"
            />
          </div>
        </div>

        {/* Organization Description */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
            Description
          </label>
          <div className="relative">
            <AlignLeft className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your organization's mission and goals..."
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-krow-brand focus:ring-2 focus:ring-krow-100"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
            Organization Location
          </label>
          <div className="relative">
            <MapPin className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Toronto, ON, Canada"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-krow-brand focus:ring-2 focus:ring-krow-100"
            />
          </div>
        </div>

        {/* Organizer Names List */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
            Organizer Names
          </label>

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newOrganizerInput}
              onChange={(e) => setNewOrganizerInput(e.target.value)}
              placeholder="Add organizer name..."
              className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-krow-brand"
            />
            <button
              type="button"
              onClick={handleAddOrganizer}
              className="px-4 py-2.5 bg-gray-900 text-white text-xs font-semibold rounded-xl hover:bg-gray-800 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Organizer
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {organizers.map((name, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-krow-50 text-krow-brand rounded-full text-xs font-semibold"
              >
                {name}
                <button
                  type="button"
                  onClick={() => handleRemoveOrganizer(idx)}
                  className="hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <AppleButton variant="primary" size="lg" fullWidth type="submit" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 animate-spin" /> Creating Organization...
              </span>
            ) : (
              'Finish Onboarding'
            )}
          </AppleButton>
        </div>
      </motion.form>
    </div>
  );
}
