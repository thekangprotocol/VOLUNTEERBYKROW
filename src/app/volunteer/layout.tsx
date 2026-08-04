import React from 'react';
import { VolunteerBottomNav } from '@/components/navigation/VolunteerBottomNav';

export default function VolunteerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#F5F5F7] pb-24">
      {children}
      <VolunteerBottomNav />
    </div>
  );
}
