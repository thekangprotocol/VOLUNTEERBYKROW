'use client';

import React from 'react';

interface KrowLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const KrowLogo: React.FC<KrowLogoProps> = ({
  size = 'md',
  showText = false,
  className = '',
}) => {
  const dimensions = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
  }[size];

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
    xl: 'text-5xl',
  }[size];

  return (
    <div className={`inline-flex flex-col items-center justify-center ${className}`}>
      <img
        src="/logo.png"
        alt="Volunteer by Krow Logo"
        className={`${dimensions} object-contain transition-transform duration-300 hover:scale-105`}
      />

      {showText && (
        <div className="mt-3 text-center tracking-tight font-bold text-gray-900">
          <span className={textSizes}>Volunteer</span>
          <span className="block text-xs uppercase tracking-widest text-krow-brand font-semibold mt-0.5">
            by Krow
          </span>
        </div>
      )}
    </div>
  );
};
