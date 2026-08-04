'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Sparkles } from 'lucide-react';
import { AppleButton } from '@/components/ui/AppleButton';

export default function CreateOpportunityPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2026-08-20');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('14:00');
  const [location, setLocation] = useState('Toronto, ON');
  const [minimumAge, setMinimumAge] = useState('14');
  const [maxVolunteers, setMaxVolunteers] = useState('20');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [parkingInfo, setParkingInfo] = useState('');
  const [accessibilityNotes, setAccessibilityNotes] = useState('');
  const [contactEmail, setContactEmail] = useState('organizer@krow.org');
  const [contactPhone, setContactPhone] = useState('');
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push('/organizer/posts');
    }, 600);
  };

  return (
    <div className="px-5 py-6 space-y-6 bg-white min-h-screen">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <Link href="/organizer/posts" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Create Opportunity</h1>
        <div className="w-9" />
      </div>

      <motion.form initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="space-y-4">
        {/* Banner Upload Box */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 ml-1">
            Banner Image
          </label>
          <div className="relative border-2 border-dashed border-gray-200 rounded-3xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer min-h-[140px]">
            {bannerUrl ? (
              <img src={bannerUrl} alt="Banner Preview" className="w-full h-32 rounded-2xl object-cover" />
            ) : (
              <div className="text-center">
                <Upload className="w-8 h-8 text-krow-brand mx-auto mb-1" />
                <span className="text-xs font-bold text-gray-700 block">Upload Banner Image</span>
                <span className="text-[11px] text-gray-400">JPG or PNG (Recommended 1200x600)</span>
              </div>
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

        {/* Opportunity Title */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 ml-1">
            Opportunity Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Waterfront Clean-up Drive"
            className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-krow-brand"
          />
        </div>

        {/* Date & Time Grid */}
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1 ml-1">Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:outline-none focus:border-krow-brand"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1 ml-1">Start Time</label>
            <input
              type="time"
              required
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:outline-none focus:border-krow-brand"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1 ml-1">End Time</label>
            <input
              type="time"
              required
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:outline-none focus:border-krow-brand"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 ml-1">Location</label>
          <input
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Address or venue location"
            className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-krow-brand"
          />
        </div>

        {/* Age & Max Volunteers */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 ml-1">Minimum Age</label>
            <input
              type="number"
              required
              min="0"
              value={minimumAge}
              onChange={(e) => setMinimumAge(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-krow-brand"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 ml-1">Max Volunteers</label>
            <input
              type="number"
              required
              min="1"
              value={maxVolunteers}
              onChange={(e) => setMaxVolunteers(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-krow-brand"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 ml-1">Short Description</label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a clear description of the volunteer role and tasks..."
            className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-krow-brand"
          />
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 ml-1">Requirements</label>
          <input
            type="text"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="e.g. Closed-toe shoes required"
            className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-krow-brand"
          />
        </div>

        {/* Parking & Accessibility */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1 ml-1">Parking (Optional)</label>
            <input
              type="text"
              value={parkingInfo}
              onChange={(e) => setParkingInfo(e.target.value)}
              placeholder="Parking details"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:outline-none focus:border-krow-brand"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1 ml-1">Accessibility (Optional)</label>
            <input
              type="text"
              value={accessibilityNotes}
              onChange={(e) => setAccessibilityNotes(e.target.value)}
              placeholder="Accessibility notes"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:outline-none focus:border-krow-brand"
            />
          </div>
        </div>

        {/* Contact info */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 ml-1">Contact Email</label>
            <input
              type="email"
              required
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:outline-none focus:border-krow-brand"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 ml-1">Contact Phone (Optional)</label>
            <input
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:outline-none focus:border-krow-brand"
            />
          </div>
        </div>

        <div className="pt-4">
          <AppleButton variant="primary" size="lg" fullWidth type="submit" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 animate-spin" /> Publishing...
              </span>
            ) : (
              'Publish Opportunity'
            )}
          </AppleButton>
        </div>
      </motion.form>
    </div>
  );
}
