'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Edit3,
  Trash2,
  UserCheck,
} from 'lucide-react';
import { MOCK_OPPORTUNITIES, MOCK_VOLUNTEER } from '@/lib/mockData';
import { AppleButton } from '@/components/ui/AppleButton';
import { AppleCard } from '@/components/ui/AppleCard';

interface VolunteerApplicant {
  id: string;
  name: string;
  age: number;
  city: string;
  province: string;
  country: string;
  avatar_url: string;
  joined_date: string;
  status: 'accepted' | 'pending' | 'removed';
}

export default function OrganizerPostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const opportunity = MOCK_OPPORTUNITIES.find((o) => o.id === id) || MOCK_OPPORTUNITIES[0];

  const [volunteers, setVolunteers] = useState<VolunteerApplicant[]>([
    {
      id: 'vol-1',
      name: 'Alex Mercer',
      age: 22,
      city: 'Toronto',
      province: 'Ontario',
      country: 'Canada',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      joined_date: 'Aug 2, 2026',
      status: 'accepted',
    },
    {
      id: 'vol-2',
      name: 'Jordan Lee',
      age: 19,
      city: 'Mississauga',
      province: 'Ontario',
      country: 'Canada',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      joined_date: 'Aug 3, 2026',
      status: 'pending',
    },
    {
      id: 'vol-3',
      name: 'Emily Chen',
      age: 24,
      city: 'Hamilton',
      province: 'Ontario',
      country: 'Canada',
      avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      joined_date: 'Aug 4, 2026',
      status: 'accepted',
    },
  ]);

  const [messageNotice, setMessageNotice] = useState<string | null>(null);

  const handleStatusChange = (volId: string, newStatus: 'accepted' | 'removed') => {
    setVolunteers(
      volunteers.map((v) => (v.id === volId ? { ...v, status: newStatus } : v))
    );
  };

  const handleMessagePlaceholder = (name: string) => {
    setMessageNotice(`Direct messaging with ${name} is coming in the next feature update!`);
    setTimeout(() => setMessageNotice(null), 3000);
  };

  const handleDeletePost = () => {
    router.push('/organizer/posts');
  };

  return (
    <div className="flex-1 bg-white min-h-screen pb-12">
      {/* Top Banner with Floating Back Button */}
      <div className="relative h-56 w-full bg-gray-900">
        <img
          src={opportunity.banner_url || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09'}
          alt={opportunity.title}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <Link
          href="/organizer/posts"
          className="absolute top-6 left-6 p-2.5 bg-white/80 backdrop-blur-md rounded-full text-gray-900 shadow-md hover:bg-white transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>

      {/* Main Content Container */}
      <div className="px-6 py-6 space-y-6 relative -mt-6 bg-white rounded-t-3xl shadow-xl">
        {/* Title and Controls Header */}
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-bold text-krow-brand uppercase tracking-wider">Opportunity Management</span>
            <h1 className="text-2xl font-extrabold text-gray-900 leading-tight mt-0.5">
              {opportunity.title}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
              <Edit3 className="w-4 h-4" />
            </button>
            <button onClick={handleDeletePost} className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messaging Toast Notice */}
        {messageNotice && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-krow-brand text-white text-xs font-semibold rounded-2xl shadow-md text-center">
            {messageNotice}
          </motion.div>
        )}

        {/* Opportunity Summary Details */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
            <span className="text-[11px] font-semibold text-gray-400 uppercase block">Date & Time</span>
            <span className="text-xs font-bold text-gray-900 block mt-0.5">{opportunity.date}</span>
            <span className="text-[11px] text-gray-600">{opportunity.start_time} - {opportunity.end_time}</span>
          </div>

          <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
            <span className="text-[11px] font-semibold text-gray-400 uppercase block">Location & Age</span>
            <span className="text-xs font-bold text-gray-900 block mt-0.5 truncate">{opportunity.location}</span>
            <span className="text-[11px] text-krow-brand font-semibold">Min Age: {opportunity.minimum_age}+</span>
          </div>
        </div>

        {/* Description & Contact */}
        <div className="space-y-2 text-xs text-gray-600">
          <p className="leading-relaxed">{opportunity.description}</p>
          {opportunity.requirements && (
            <p className="p-3 bg-amber-50 rounded-xl text-amber-900 font-medium">
              <strong className="font-bold">Requirements:</strong> {opportunity.requirements}
            </p>
          )}
        </div>

        {/* Registered Volunteers Section */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-krow-brand" /> Registered Volunteers ({volunteers.filter(v => v.status !== 'removed').length})
            </h3>
            <span className="text-xs font-semibold text-gray-500">Max Cap: {opportunity.max_volunteers}</span>
          </div>

          <div className="space-y-3">
            {volunteers.map((vol) => (
              <AppleCard key={vol.id} className="p-4 flex flex-col space-y-3">
                {/* Volunteer Profile Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={vol.avatar_url}
                      alt={vol.name}
                      className="w-12 h-12 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                        {vol.name}
                        <span className="text-xs font-normal text-gray-500">({vol.age} yrs)</span>
                      </h4>
                      <p className="text-xs text-gray-500">{vol.city}, {vol.province}, {vol.country}</p>
                      <span className="text-[10px] text-gray-400">Joined: {vol.joined_date}</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {vol.status === 'accepted' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Accepted
                      </span>
                    )}
                    {vol.status === 'pending' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full">
                        Pending Approval
                      </span>
                    )}
                    {vol.status === 'removed' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full">
                        Removed
                      </span>
                    )}
                  </div>
                </div>

                {/* Organizer Actions Row */}
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  {vol.status !== 'accepted' && (
                    <AppleButton
                      variant="secondary"
                      size="sm"
                      onClick={() => handleStatusChange(vol.id, 'accepted')}
                      icon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    >
                      Accept
                    </AppleButton>
                  )}

                  {vol.status !== 'removed' && (
                    <AppleButton
                      variant="ghost"
                      size="sm"
                      onClick={() => handleStatusChange(vol.id, 'removed')}
                      icon={<XCircle className="w-3.5 h-3.5 text-red-500" />}
                    >
                      Remove
                    </AppleButton>
                  )}

                  <AppleButton
                    variant="outline"
                    size="sm"
                    onClick={() => handleMessagePlaceholder(vol.name)}
                    icon={<MessageSquare className="w-3.5 h-3.5 text-krow-brand" />}
                  >
                    Message
                  </AppleButton>
                </div>
              </AppleCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
