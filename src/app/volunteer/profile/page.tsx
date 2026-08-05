'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, MapPin, Camera, LogOut, Trash2, Save, Sparkles, AlertTriangle } from 'lucide-react';
import { LOCATIONS } from '@/lib/data/locations';
import { AppleButton } from '@/components/ui/AppleButton';
import { KrowLogo } from '@/components/ui/KrowLogo';
import { getSavedProfile, saveProfile } from '@/lib/profileStore';
import { createClient } from '@/lib/supabase/client';

export default function VolunteerProfilePage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('Canada');
  const [province, setProvince] = useState('Ontario');
  const [city, setCity] = useState('Toronto');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const profile = getSavedProfile();
    if (profile.name) setName(profile.name);
    if (profile.age) setAge(profile.age.toString());
    if (profile.country) setCountry(profile.country);
    if (profile.province) setProvince(profile.province);
    if (profile.city) setCity(profile.city);
    if (profile.avatar_url) setAvatarUrl(profile.avatar_url);
  }, []);

  const availableSubdivisions = Object.keys(LOCATIONS[country]?.subdivisions || {});
  const availableCities = LOCATIONS[country]?.subdivisions[province] || [];

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    setCountry(newCountry);
    const newProvinces = Object.keys(LOCATIONS[newCountry]?.subdivisions || {});
    const firstProvince = newProvinces[0] || '';
    setProvince(firstProvince);
    const newCities = LOCATIONS[newCountry]?.subdivisions[firstProvince] || [];
    setCity(newCities[0] || '');
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProvince = e.target.value;
    setProvince(newProvince);
    const newCities = LOCATIONS[country]?.subdivisions[newProvince] || [];
    setCity(newCities[0] || '');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    saveProfile({
      name,
      age: age ? parseInt(age, 10) : null,
      country,
      province,
      city,
      avatar_url: avatarUrl,
    });
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

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('users').delete().eq('id', user.id);
      }
      await supabase.auth.signOut();
    } catch (err) {
      console.log('Delete account note:', err);
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
          <span className="text-xs font-bold text-krow-brand tracking-widest uppercase">My Account</span>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Profile</h1>
        </div>
        <KrowLogo size="sm" />
      </div>

      {/* Profile Header Avatar */}
      <div className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-apple-sm flex flex-col items-center text-center">
        <div className="relative group cursor-pointer">
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-2 border-krow-brand shadow-md" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-krow-brand text-white flex items-center justify-center shadow-apple-purple">
              <KrowLogo size="md" />
            </div>
          )}
          <label className="absolute bottom-0 right-0 p-2 bg-gray-900 text-white rounded-full cursor-pointer hover:bg-gray-800 transition-colors shadow-md">
            <Camera className="w-4 h-4" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setAvatarUrl(URL.createObjectURL(file));
              }}
            />
          </label>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mt-3">{name}</h2>
        <p className="text-xs text-apple-subtext font-medium">{city}, {province}, {country}</p>
      </div>

      {/* Editable Settings Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-apple-sm space-y-4">
        <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">Edit Information</h3>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 ml-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-krow-brand"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 ml-1">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-krow-brand"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 ml-1">Country</label>
          <select
            value={country}
            onChange={handleCountryChange}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-krow-brand"
          >
            <option value="Canada">Canada 🇨🇦</option>
            <option value="United States">United States 🇺🇸</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 ml-1">
            {country === 'Canada' ? 'Province / Territory' : 'State'}
          </label>
          <select
            value={province}
            onChange={handleProvinceChange}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-krow-brand"
          >
            {availableSubdivisions.map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 ml-1">City</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-krow-brand"
          >
            {availableCities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="pt-2">
          <AppleButton variant="primary" size="md" fullWidth type="submit" disabled={saving}>
            {saving ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin" /> Saving Changes...
              </span>
            ) : (
              'Save Profile'
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
          Delete Account
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
            <h3 className="text-xl font-bold text-gray-900">Delete Volunteer Account?</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              This action is permanent. Deleting your account removes your profile, avatar image, and all volunteer registrations.
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
                onClick={handleDeleteAccount}
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
