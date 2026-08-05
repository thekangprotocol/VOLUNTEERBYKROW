-- VOLUNTEER BY KROW - DATABASE SCHEMA FOR SUPABASE
-- Run this script in the Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  role TEXT CHECK (role IN ('volunteer', 'organizer')),
  name TEXT,
  age INTEGER,
  country TEXT,
  province TEXT,
  city TEXT,
  avatar_url TEXT,
  account_mode TEXT CHECK (account_mode IN ('myself', 'parent')) DEFAULT 'myself',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. ORGANIZATIONS TABLE
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  banner_url TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ORGANIZERS TABLE (Sub-organizers within an organization)
CREATE TABLE IF NOT EXISTS public.organizers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. OPPORTUNITIES TABLE
CREATE TABLE IF NOT EXISTS public.opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  banner_url TEXT,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  location TEXT NOT NULL,
  minimum_age INTEGER DEFAULT 0,
  max_volunteers INTEGER DEFAULT 10,
  requirements TEXT,
  parking_info TEXT,
  accessibility_notes TEXT,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. REGISTRATIONS TABLE
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
  volunteer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('pending', 'accepted', 'declined')) DEFAULT 'accepted',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(opportunity_id, volunteer_id)
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users are viewable by everyone" ON public.users FOR SELECT USING (true);
CREATE POLICY "Anyone can insert users" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (true);
CREATE POLICY "Users can delete own profile" ON public.users FOR DELETE USING (true);

-- Organizations policies
CREATE POLICY "Organizations viewable by everyone" ON public.organizations FOR SELECT USING (true);
CREATE POLICY "Anyone can create organizations" ON public.organizations FOR INSERT WITH CHECK (true);
CREATE POLICY "Owners can update organization" ON public.organizations FOR UPDATE USING (true);
CREATE POLICY "Owners can delete organization" ON public.organizations FOR DELETE USING (true);

-- Organizers policies
CREATE POLICY "Organizers viewable by everyone" ON public.organizers FOR SELECT USING (true);
CREATE POLICY "Org owners can manage organizers" ON public.organizers FOR ALL USING (true);

-- Opportunities policies
CREATE POLICY "Opportunities viewable by everyone" ON public.opportunities FOR SELECT USING (true);
CREATE POLICY "Anyone can create opportunities" ON public.opportunities FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update opportunities" ON public.opportunities FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete opportunities" ON public.opportunities FOR DELETE USING (true);

-- Registrations policies
CREATE POLICY "Registrations viewable by authenticated users" ON public.registrations FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Volunteers can register themselves" ON public.registrations FOR INSERT WITH CHECK (auth.uid() = volunteer_id);
CREATE POLICY "Volunteers can cancel registrations" ON public.registrations FOR DELETE USING (auth.uid() = volunteer_id);
CREATE POLICY "Org owners can update registration status" ON public.registrations FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.opportunities 
    JOIN public.organizations ON public.opportunities.organization_id = public.organizations.id
    WHERE public.opportunities.id = public.registrations.opportunity_id 
    AND public.organizations.owner_id = auth.uid()
  )
);

-- AUTOMATIC AUTH TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', NULL)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- STORAGE BUCKETS SETUP INSTRUCTIONS:
-- In Supabase Dashboard -> Storage -> Create Buckets:
-- 1. 'avatars' (Public)
-- 2. 'banners' (Public)
-- 3. 'logos' (Public)
