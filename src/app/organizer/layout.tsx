import React from 'react';
import { OrganizerBottomNav } from '@/components/navigation/OrganizerBottomNav';

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#F5F5F7] pb-24">
      {children}
      <OrganizerBottomNav />
    </div>
  );
}
