'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Building2,
  MapPin,
  Upload,
  Plus,
  Trash2,
  LogOut,
  Save,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import { MOCK_ORGANIZATION } from '@/lib/mockData';
import { AppleButton } from '@/components/ui/AppleButton';
import { KrowLogo } from '@/components/ui/KrowLogo';
import { createClient } from '@/lib/supabase/client';

export default function OrganizationProfilePage() {
  const router = useRouter();

  const [orgName, setOrgName] = useState(MOCK_ORGANIZATION.name);
  const [description, setDescription] = useState(MOCK_ORGANIZATION.description || '');
  const [location, setLocation] = useState(MOCK_ORGANIZATION.location || '');
  const [organizers, setOrganizers] = useState<string[]>(['Sarah Jenkins', 'Marcus Vance']);
  const [newOrganizerInput, setNewOrganizerInput] = useState('');
  const [logoUrl, setLogoUrl] = useState(MOCK_ORGANIZATION.logo_url);
  const [bannerUrl, setBannerUrl] = useState(MOCK_ORGANIZATION.banner_url);

  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleAddOrganizer = () => {
    if (newOrganizerInput.trim()) {
      setOrganizers([...organizers, newOrganizerInput.trim()]);
      setNewOrganizerInput('');
    }
  };

  const handleRemoveOrganizer = (index: number) => {
    setOrganizers(organizers.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => setSaving(false), 500);
  };

  const handleLogOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (err) {
      console.log('Signout note:', err);
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.clear();
      }
      router.push('/');
    }
  };

  const handleDeleteOrganization = async () => {
    setDeleting(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Delete user and organization rows
        await supabase.from('users').delete().eq('id', user.id);
        await supabase.from('organizations').delete().eq('owner_id', user.id);
        if (user.email) {
          await supabase.from('users').delete().eq('email', user.email);
          // Delete all opportunities created by this organizer
          await supabase.from('opportunities').delete().eq('contact_email', user.email);
        }
      }
      await supabase.auth.signOut();
    } catch (err) {
      console.log('Delete organization note:', err);
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.clear();
      }
      setDeleting(false);
      router.push('/');
    }
  };

  return (
    <div className="px-5 py-6 space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-krow-brand tracking-widest uppercase">Organization Settings</span>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Profile</h1>
        </div>
        <KrowLogo size="sm" />
      </div>

      {/* Organization Header Branding Card */}
      <div className="bg-white rounded-3xl overflow-hidden border border-black/[0.06] shadow-apple-sm relative">
        <div className="h-32 w-full bg-gray-200 relative">
          <img
            src={bannerUrl || 'https://images.unsplash.com/photo-1559027615-cd4628902d4a'}
            alt="Banner"
            className="w-full h-full object-cover"
          />
          <label className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-md text-white rounded-full cursor-pointer hover:bg-black/80 transition-colors">
            <Upload className="w-4 h-4" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setBannerUrl(URL.createObjectURL(file));
              }}
            />
          </label>
        </div>

        <div className="p-5 pt-0 relative flex flex-col items-center text-center -mt-10">
          <div className="relative group cursor-pointer">
            <img
              src={logoUrl || 'https://images.unsplash.com/photo-1582213782179'}
              alt="Logo"
              className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-md bg-white"
            />
            <label className="absolute bottom-0 right-0 p-1.5 bg-gray-900 text-white rounded-full cursor-pointer hover:bg-gray-800 transition-colors shadow-md">
              <Upload className="w-3.5 h-3.5" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setLogoUrl(URL.createObjectURL(file));
                }}
              />
            </label>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mt-2">{orgName}</h2>
          <p className="text-xs text-apple-subtext font-medium">{location}</p>
        </div>
      </div>

      {/* Editable Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-apple-sm space-y-4">
        <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">Organization Details</h3>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 ml-1">Organization Name</label>
          <input
            type="text"
            required
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-krow-brand"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 ml-1">Description</label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-krow-brand"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 ml-1">Location</label>
          <input
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-krow-brand"
          />
        </div>

        {/* Organizer Names List */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
            Organizer Team Members
          </label>

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newOrganizerInput}
              onChange={(e) => setNewOrganizerInput(e.target.value)}
              placeholder="Add organizer name..."
              className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-krow-brand"
            />
            <button
              type="button"
              onClick={handleAddOrganizer}
              className="px-4 py-2.5 bg-gray-900 text-white text-xs font-semibold rounded-xl hover:bg-gray-800 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {organizers.map((name, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-krow-50 text-krow-brand rounded-full text-xs font-semibold"
              >
                {name}
                <button
                  type="button"
                  onClick={() => handleRemoveOrganizer(idx)}
                  className="hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <AppleButton variant="primary" size="md" fullWidth type="submit" disabled={saving}>
            {saving ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin" /> Saving Changes...
              </span>
            ) : (
              'Save Organization'
            )}
          </AppleButton>
        </div>
      </form>

      {/* Account Settings Actions */}
      <div className="space-y-3">
        <AppleButton
          variant="secondary"
          size="md"
          fullWidth
          onClick={handleLogOut}
          icon={<LogOut className="w-4 h-4" />}
        >
          Log Out
        </AppleButton>

        <AppleButton
          variant="danger"
          size="md"
          fullWidth
          onClick={() => setShowDeleteModal(true)}
          icon={<Trash2 className="w-4 h-4" />}
        >
          Delete Organization
        </AppleButton>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl text-center"
          >
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Delete Organization?</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              This action is permanent. Deleting your organization will permanently erase your profile, all created opportunities, volunteer signups, and associated data.
            </p>

            <div className="flex gap-3 pt-2">
              <AppleButton
                variant="secondary"
                size="md"
                fullWidth
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </AppleButton>
              <AppleButton
                variant="danger"
                size="md"
                fullWidth
                onClick={handleDeleteOrganization}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </AppleButton>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
