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
      {/* Crown / Crow Apple minimal icon */}
      <div
        className={`${dimensions} rounded-3xl bg-gradient-to-tr from-krow-900 via-krow-brand to-purple-500 shadow-apple-purple flex items-center justify-center p-3 relative overflow-hidden transition-transform duration-300 hover:scale-105`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full text-white drop-shadow-md"
        >
          {/* Stylized Krow Wings / Crown */}
          <path d="M12 3L15 9.5L21 6L18 15H6L3 6L9 9.5L12 3Z" fill="currentColor" fillOpacity="0.2" />
          <path d="M12 3L15 9.5L21 6L18 15H6L3 6L9 9.5L12 3Z" />
          <circle cx="12" cy="18" r="1.5" fill="currentColor" />
        </svg>
        {/* Subtle glass shimmer overlay */}
        <div className="absolute inset-0 bg-white/10 opacity-30 backdrop-blur-xs rounded-3xl pointer-events-none" />
      </div>

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
