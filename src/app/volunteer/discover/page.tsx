'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Clock, Users, Filter, Sparkles } from 'lucide-react';
import { AppleCard } from '@/components/ui/AppleCard';
import { MOCK_OPPORTUNITIES } from '@/lib/mockData';
import { KrowLogo } from '@/components/ui/KrowLogo';

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Nearby' | 'Newest' | 'Date' | 'Age' | 'City'>('All');

  const filteredOpportunities = MOCK_OPPORTUNITIES.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.location.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === 'Nearby') return matchesSearch && opp.location.includes('Toronto');
    if (activeFilter === 'City') return matchesSearch && opp.location.includes('Toronto');
    return matchesSearch;
  });

  return (
    <div className="px-5 py-6 space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-krow-brand tracking-widest uppercase">Explore Causes</span>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Discover</h1>
        </div>
        <KrowLogo size="sm" />
      </div>

      {/* Apple-style Search Bar */}
      <div className="relative">
        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search opportunities, cities, or causes..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-black/[0.06] rounded-2xl text-sm font-medium shadow-apple-sm focus:outline-none focus:ring-2 focus:ring-krow-brand/20 transition-all"
        />
      </div>

      {/* Filter Pill Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {(['All', 'Nearby', 'Newest', 'Date', 'Age', 'City'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === filter
                ? 'bg-krow-brand text-white shadow-apple-purple'
                : 'bg-white text-gray-700 border border-black/[0.06] hover:bg-gray-50'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Opportunity Cards List or Empty State */}
      {filteredOpportunities.length > 0 ? (
        <div className="space-y-4">
          {filteredOpportunities.map((opp, idx) => {
            const spotsRemaining = opp.max_volunteers - (opp.registrations_count || 0);

            return (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.3 }}
              >
                <Link href={`/volunteer/opportunity/${opp.id}`}>
                  <AppleCard className="group">
                    {/* Banner Image */}
                    <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                      <img
                        src={opp.banner_url || 'https://images.unsplash.com/photo-1559027615-cd4628902d4a'}
                        alt={opp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-krow-brand" />
                        {spotsRemaining} spots left
                      </div>
                    </div>

                    {/* Card Info Content */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs text-apple-subtext font-semibold">
                        <span>{opp.organization?.name}</span>
                        <span className="bg-purple-50 text-krow-brand px-2.5 py-0.5 rounded-md">
                          Age {opp.minimum_age}+
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-krow-brand transition-colors">
                        {opp.title}
                      </h3>

                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                        {opp.description}
                      </p>

                      <div className="pt-2 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs text-gray-600 font-medium">
                        <div className="flex items-center gap-1.5 truncate">
                          <Calendar className="w-3.5 h-3.5 text-krow-brand flex-shrink-0" />
                          <span className="truncate">{opp.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate">
                          <Clock className="w-3.5 h-3.5 text-krow-brand flex-shrink-0" />
                          <span className="truncate">{opp.start_time} - {opp.end_time}</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate col-span-2">
                          <MapPin className="w-3.5 h-3.5 text-krow-brand flex-shrink-0" />
                          <span className="truncate">{opp.location}</span>
                        </div>
                      </div>
                    </div>
                  </AppleCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-8 border border-black/[0.06] shadow-apple-sm text-center my-8 space-y-4"
        >
          <div className="w-16 h-16 bg-krow-50 text-krow-brand rounded-3xl flex items-center justify-center mx-auto shadow-apple-purple">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">
              No opportunities in your area yet!
            </h3>
            <p className="text-xs text-apple-subtext leading-relaxed">
              We are currently onboarding volunteers first! Check back later as local organizations join and post new volunteer events.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
