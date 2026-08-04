'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AppleButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export const AppleButton: React.FC<AppleButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon,
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary:
      'bg-krow-brand hover:bg-krow-700 text-white shadow-apple-purple hover:shadow-lg active:scale-95',
    secondary:
      'bg-gray-100 hover:bg-gray-200 text-gray-900 active:bg-gray-300',
    outline:
      'border border-gray-300 hover:bg-gray-50 text-gray-900 active:bg-gray-100',
    danger:
      'bg-red-500 hover:bg-red-600 text-white shadow-sm active:bg-red-700',
    ghost: 'hover:bg-gray-100 text-gray-700 active:bg-gray-200',
  }[variant];

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-6 py-3.5 text-sm gap-2',
    lg: 'px-8 py-4 text-base font-bold gap-2.5',
  }[size];

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${widthStyle} ${className}`}
    >
      {icon && <span className="inline-block">{icon}</span>}
      {children}
    </motion.button>
  );
};
