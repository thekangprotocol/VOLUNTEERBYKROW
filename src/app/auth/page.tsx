'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, Sparkles } from 'lucide-react';
import { KrowLogo } from '@/components/ui/KrowLogo';
import { AppleButton } from '@/components/ui/AppleButton';

function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') === 'login' ? 'login' : 'signup';

  const [mode, setMode] = useState<'signup' | 'login'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate Auth flow & redirect to Account Type Selection
    setTimeout(() => {
      setLoading(false);
      router.push('/onboarding/role');
    }, 600);
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/onboarding/role');
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="my-auto py-8"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
        </h1>
        <p className="text-sm text-apple-subtext mt-1">
          {mode === 'signup'
            ? 'Join Volunteer by Krow to make a difference'
            : 'Log in to continue your volunteer journey'}
        </p>
      </div>

      {/* Google OAuth Button */}
      <div className="mb-6">
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white border border-gray-200 rounded-full font-medium text-gray-700 shadow-apple-sm hover:bg-gray-50 active:bg-gray-100 transition-all text-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>
      </div>

      <div className="relative flex py-3 items-center mb-6">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink mx-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">
          or with email
        </span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      {/* Email Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-krow-brand focus:ring-2 focus:ring-krow-100 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
            Password
          </label>
          <div className="relative">
            <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-krow-brand focus:ring-2 focus:ring-krow-100 transition-all"
            />
          </div>
        </div>

        <div className="pt-2">
          <AppleButton variant="primary" size="lg" fullWidth type="submit" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 animate-spin" /> Processing...
              </span>
            ) : mode === 'signup' ? (
              'Create Account'
            ) : (
              'Log In'
            )}
          </AppleButton>
        </div>
      </form>

      {/* Switch Mode Toggle Footer */}
      <div className="text-center py-4 border-t border-gray-100 mt-6">
        <button
          onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
          className="text-sm font-medium text-krow-brand hover:underline"
        >
          {mode === 'signup'
            ? 'Already have an account? Log In'
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </motion.div>
  );
}

export default function AuthPage() {
  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-8 bg-white min-h-screen">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <Link href="/" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </Link>
        <KrowLogo size="sm" />
        <div className="w-10" />
      </div>

      <Suspense fallback={<div className="text-center py-12 text-gray-400">Loading auth...</div>}>
        <AuthForm />
      </Suspense>
    </div>
  );
}
