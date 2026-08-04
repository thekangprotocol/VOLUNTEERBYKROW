'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  ShieldAlert,
  Car,
  Accessibility,
  Mail,
  Phone,
  XCircle,
} from 'lucide-react';
import { MOCK_OPPORTUNITIES } from '@/lib/mockData';
import { AppleButton } from '@/components/ui/AppleButton';

export default function OpportunityDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const opportunity = MOCK_OPPORTUNITIES.find((o) => o.id === id) || MOCK_OPPORTUNITIES[0];

  const [isRegistered, setIsRegistered] = useState(opportunity.is_registered || false);
  const [loading, setLoading] = useState(false);

  const handleToggleRegistration = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsRegistered(!isRegistered);
    }, 400);
  };

  const spotsRemaining = opportunity.max_volunteers - (opportunity.registrations_count || 0) + (isRegistered ? -1 : 0);

  return (
    <div className="flex-1 bg-white min-h-screen">
      {/* Top Banner with Floating Back Button */}
      <div className="relative h-64 w-full bg-gray-900">
        <img
          src={opportunity.banner_url || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09'}
          alt={opportunity.title}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <Link
          href="/volunteer/discover"
          className="absolute top-6 left-6 p-2.5 bg-white/80 backdrop-blur-md rounded-full text-gray-900 shadow-md hover:bg-white transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>

      {/* Main Content Container */}
      <div className="px-6 py-6 space-y-6 relative -mt-6 bg-white rounded-t-3xl shadow-xl">
        {/* Organization Header */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <img
            src={opportunity.organization?.logo_url || 'https://images.unsplash.com/photo-1582213782179'}
            alt="Org Logo"
            className="w-12 h-12 rounded-2xl object-cover border border-gray-200"
          />
          <div>
            <h4 className="text-sm font-bold text-gray-900">{opportunity.organization?.name}</h4>
            <p className="text-xs text-apple-subtext">{opportunity.organization?.location}</p>
          </div>
        </div>

        {/* Opportunity Title & Badges */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-purple-100 text-krow-brand text-xs font-bold px-3 py-1 rounded-full">
              Minimum Age {opportunity.minimum_age}+
            </span>
            <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> {spotsRemaining} Spots Remaining
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
            {opportunity.title}
          </h1>
        </div>

        {/* Action Button Section */}
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
          {isRegistered ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>You are registered for this event!</span>
              </div>
              <p className="text-xs text-gray-500">
                This opportunity is automatically synced to your Volunteer Calendar.
              </p>
              <AppleButton
                variant="outline"
                size="md"
                fullWidth
                onClick={handleToggleRegistration}
                disabled={loading}
                icon={<XCircle className="w-4 h-4 text-red-500" />}
              >
                {loading ? 'Updating...' : 'Cancel Registration'}
              </AppleButton>
            </div>
          ) : (
            <AppleButton
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleToggleRegistration}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Sign Up For Opportunity'}
            </AppleButton>
          )}
        </div>

        {/* Date, Time & Location Cards */}
        <div className="space-y-3">
          <div className="flex items-center gap-3.5 p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
            <Calendar className="w-6 h-6 text-krow-brand" />
            <div>
              <span className="text-xs text-gray-400 font-semibold block">Date</span>
              <span className="text-sm font-bold text-gray-900">{opportunity.date}</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
            <Clock className="w-6 h-6 text-krow-brand" />
            <div>
              <span className="text-xs text-gray-400 font-semibold block">Time</span>
              <span className="text-sm font-bold text-gray-900">
                {opportunity.start_time} - {opportunity.end_time}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
            <MapPin className="w-6 h-6 text-krow-brand" />
            <div>
              <span className="text-xs text-gray-400 font-semibold block">Location</span>
              <span className="text-sm font-bold text-gray-900">{opportunity.location}</span>
            </div>
          </div>
        </div>

        {/* Full Description */}
        <div className="space-y-2">
          <h3 className="text-base font-bold text-gray-900">About the Opportunity</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{opportunity.description}</p>
        </div>

        {/* Additional Details: Requirements, Parking, Accessibility */}
        <div className="space-y-3 pt-2">
          {opportunity.requirements && (
            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/60 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-amber-900 block">Requirements</span>
                <span className="text-xs text-amber-800">{opportunity.requirements}</span>
              </div>
            </div>
          )}

          {opportunity.parking_info && (
            <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-3">
              <Car className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-gray-900 block">Parking Information</span>
                <span className="text-xs text-gray-600">{opportunity.parking_info}</span>
              </div>
            </div>
          )}

          {opportunity.accessibility_notes && (
            <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-3">
              <Accessibility className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-gray-900 block">Accessibility</span>
                <span className="text-xs text-gray-600">{opportunity.accessibility_notes}</span>
              </div>
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-100 pt-4 space-y-2">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Contact Organizer</h3>
          <div className="flex flex-col gap-1.5 text-xs text-gray-700 font-medium">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-krow-brand" />
              <span>{opportunity.contact_email}</span>
            </div>
            {opportunity.contact_phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-krow-brand" />
                <span>{opportunity.contact_phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
