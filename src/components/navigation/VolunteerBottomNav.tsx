'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Calendar as CalendarIcon, User } from 'lucide-react';

export const VolunteerBottomNav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Discover',
      href: '/volunteer/discover',
      icon: Compass,
    },
    {
      name: 'Calendar',
      href: '/volunteer/calendar',
      icon: CalendarIcon,
    },
    {
      name: 'Profile',
      href: '/volunteer/profile',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-black/[0.08] px-6 py-2 pb-safe shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center w-20 py-1 transition-colors duration-200 ${
                isActive ? 'text-krow-brand font-semibold' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div
                className={`p-1.5 rounded-full transition-all ${
                  isActive ? 'bg-krow-50 scale-105' : ''
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.75px]'}`} />
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
