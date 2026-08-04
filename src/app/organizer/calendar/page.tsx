'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, MapPin, ChevronRight, Users, Plus } from 'lucide-react';
import { MOCK_OPPORTUNITIES } from '@/lib/mockData';
import { AppleCard } from '@/components/ui/AppleCard';
import { KrowLogo } from '@/components/ui/KrowLogo';

export default function OrganizerCalendarPage() {
  const orgEvents = MOCK_OPPORTUNITIES;

  const [selectedDay, setSelectedDay] = useState<number>(15);

  const days = [12, 13, 14, 15, 16, 17, 18];

  return (
    <div className="px-5 py-6 space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-krow-brand tracking-widest uppercase">Organization Schedule</span>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Calendar</h1>
        </div>
        <KrowLogo size="sm" />
      </div>

      {/* Calendar Week Strip */}
      <div className="bg-white rounded-3xl p-4 border border-black/[0.06] shadow-apple-sm">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-sm font-bold text-gray-900">August 2026</span>
          <span className="text-xs font-semibold text-krow-brand bg-krow-50 px-2.5 py-1 rounded-full">
            {orgEvents.length} Active Events
          </span>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <span key={i} className="text-[11px] font-semibold text-gray-400 py-1">
              {d}
            </span>
          ))}

          {days.map((day) => {
            const isSelected = selectedDay === day;
            const hasEvent = day === 15 || day === 18;

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`py-2 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-krow-brand text-white font-bold shadow-apple-purple scale-105'
                    : 'hover:bg-gray-100 text-gray-800 font-medium'
                }`}
              >
                <span className="text-xs">{day}</span>
                {hasEvent && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full mt-1 ${
                      isSelected ? 'bg-white' : 'bg-krow-brand'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
            Organization Events
          </h3>

          <Link href="/organizer/posts/create" className="text-xs font-bold text-krow-brand flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" /> Add Event
          </Link>
        </div>

        {orgEvents.map((event) => (
          <motion.div key={event.id} whileTap={{ scale: 0.98 }}>
            <Link href={`/organizer/posts/${event.id}`}>
              <AppleCard className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-krow-brand text-white flex flex-col items-center justify-center flex-shrink-0 font-bold shadow-apple-purple">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-white/80">
                      AUG
                    </span>
                    <span className="text-base leading-none">{event.date.split('-')[2]}</span>
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-xs text-krow-brand font-bold">
                      <Users className="w-3.5 h-3.5" /> {event.registrations_count || 12} / {event.max_volunteers} Volunteers
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{event.title}</h4>
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-krow-brand" /> {event.start_time}
                      </span>
                      <span>•</span>
                      <span className="truncate">{event.location}</span>
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </AppleCard>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
