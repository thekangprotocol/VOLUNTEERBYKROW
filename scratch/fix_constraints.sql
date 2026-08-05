-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/pmuhmzarkjhxptddtayk/sql)

-- 1. Drop foreign key constraints blocking opportunity & organization creation
ALTER TABLE public.opportunities DROP CONSTRAINT IF EXISTS opportunities_organization_id_fkey;
ALTER TABLE public.organizations DROP CONSTRAINT IF EXISTS organizations_owner_id_fkey;
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_id_fkey;

-- 2. Ensure RLS policies allow insertion
DROP POLICY IF EXISTS "Anyone can create opportunities" ON public.opportunities;
CREATE POLICY "Anyone can create opportunities" ON public.opportunities FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can create organizations" ON public.organizations;
CREATE POLICY "Anyone can create organizations" ON public.organizations FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can insert users" ON public.users;
CREATE POLICY "Anyone can insert users" ON public.users FOR INSERT WITH CHECK (true);
