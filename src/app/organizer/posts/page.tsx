'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Users, Calendar, MapPin, Edit3, Trash2, Layers } from 'lucide-react';
import { MOCK_OPPORTUNITIES } from '@/lib/mockData';
import { AppleCard } from '@/components/ui/AppleCard';
import { AppleButton } from '@/components/ui/AppleButton';
import { KrowLogo } from '@/components/ui/KrowLogo';
import { getLocalOpportunities } from '@/lib/opportunityStore';

export default function OrganizerPostsPage() {
  const [opportunities, setOpportunities] = useState(MOCK_OPPORTUNITIES);

  useEffect(() => {
    const published = getLocalOpportunities();
    if (published.length > 0) {
      setOpportunities(published);
    }
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpportunities(opportunities.filter((o) => o.id !== id));
  };

  return (
    <div className="px-5 py-6 space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-krow-brand tracking-widest uppercase">Organizer Studio</span>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Posts</h1>
        </div>
        <KrowLogo size="sm" />
      </div>

      {/* Create Opportunity Banner / Button */}
      <Link href="/organizer/posts/create" className="block">
        <AppleButton
          variant="primary"
          size="lg"
          fullWidth
          icon={<Plus className="w-5 h-5" />}
        >
          Create Opportunity
        </AppleButton>
      </Link>

      {/* Opportunity Cards List or Empty State */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
          Active Opportunities ({opportunities.length})
        </h3>

        {opportunities.length > 0 ? (
          opportunities.map((opp, idx) => (
            <motion.div key={opp.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}>
              <Link href={`/organizer/posts/${opp.id}`}>
                <AppleCard className="group relative">
                  <div className="relative h-40 w-full overflow-hidden bg-gray-100">
                    <img
                      src={opp.banner_url || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09'}
                      alt={opp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-krow-brand" />
                      {opp.registrations_count || 0} / {opp.max_volunteers} Signed Up
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-krow-brand transition-colors">
                      {opp.title}
                    </h3>

                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 font-medium">
                      <div className="flex items-center gap-1.5 truncate">
                        <Calendar className="w-3.5 h-3.5 text-krow-brand flex-shrink-0" />
                        <span className="truncate">{opp.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-krow-brand flex-shrink-0" />
                        <span className="truncate">{opp.location}</span>
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-krow-brand font-semibold hover:underline">
                        View Volunteers & Details →
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          className="p-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                          title="Edit Opportunity"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleDelete(opp.id, e)}
                          className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                          title="Delete Opportunity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </AppleCard>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="p-8 text-center bg-white rounded-3xl border border-black/[0.06] shadow-apple-sm space-y-3">
            <div className="w-14 h-14 bg-krow-50 text-krow-brand rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <Layers className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base font-bold text-gray-900">No opportunities created yet</h4>
              <p className="text-xs text-apple-subtext mt-1 max-w-xs mx-auto">
                Click "Create Opportunity" above to list your first volunteer event and start accepting volunteer sign-ups!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
