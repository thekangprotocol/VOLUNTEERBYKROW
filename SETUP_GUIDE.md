# Setup Guide for Volunteer by Krow

This guide provides step-by-step instructions for everything you need to configure **outside** of this codebase to run, test, and deploy **Volunteer by Krow**.

---

## 1. Supabase Project Setup

1. Go to [https://supabase.com](https://supabase.com) and log in or create a free account.
2. Click **New Project**, enter a project name (e.g., `volunteer-by-krow`), choose a database password and a region close to your target audience (e.g., US East or Canada Central).
3. Once created, navigate to **Project Settings** (gear icon) -> **API**.
4. Copy the following keys:
   - **Project URL** (`https://<project-id>.supabase.co`)
   - **Project API Key (`anon` / `public`)**

---

## 2. Database Schema Creation

1. In your Supabase Dashboard, open the **SQL Editor** from the left menu.
2. Click **New query**.
3. Open the file [`supabase_schema.sql`](./supabase_schema.sql) in this repository, copy its entire contents, and paste it into the Supabase SQL Editor.
4. Click **Run** (or press Ctrl+Enter / Cmd+Enter).
5. Verify in **Table Editor** that 5 tables have been created:
   - `users`
   - `organizations`
   - `organizers`
   - `opportunities`
   - `registrations`

---

## 3. Storage Buckets Configuration

1. In Supabase Dashboard, go to **Storage**.
2. Click **New bucket** and create the following 3 buckets:
   - Name: `avatars` | Toggle **Public bucket** ON
   - Name: `banners` | Toggle **Public bucket** ON
   - Name: `logos`   | Toggle **Public bucket** ON
3. Save each bucket.

---

## 4. Google OAuth Setup (Optional for Google Sign-In)

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project named `Volunteer by Krow`.
3. Navigate to **APIs & Services** -> **OAuth consent screen**. Select **External**, configure app details (App Name: Volunteer by Krow, support email), and save.
4. Go to **Credentials** -> **Create Credentials** -> **OAuth client ID**.
   - Application type: **Web application**
   - Authorized redirect URIs: Add your Supabase Auth callback URL:
     `https://<your-supabase-project-id>.supabase.co/auth/v1/callback`
5. Copy the generated **Client ID** and **Client Secret**.
6. Back in Supabase Dashboard, go to **Authentication** -> **Providers** -> **Google**.
7. Enable Google auth, paste your **Client ID** and **Client Secret**, and save.

---

## 5. Local Environment Variables

1. Copy `.env.example` to `.env.local` inside the project root:
   ```bash
   cp .env.example .env.local
   ```
2. Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

---

## 6. Vercel Deployment Setup

1. Push this repository to GitHub or GitLab.
2. Go to [https://vercel.com](https://vercel.com) and click **Add New** -> **Project**.
3. Import your `VOLUNTEERBYKROW` repository.
4. Framework Preset: **Next.js**.
5. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://<your-project-id>.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `<your-anon-key>`
   - `NEXT_PUBLIC_SITE_URL` = `https://your-app-domain.vercel.app`
6. Click **Deploy**.
7. Update Supabase Authentication URL Configuration:
   - In Supabase Dashboard -> **Authentication** -> **URL Configuration**, set **Site URL** to your Vercel production URL (`https://your-app-domain.vercel.app`).
   - Add `https://your-app-domain.vercel.app/**` to **Redirect URLs**.

---

🎉 **You're all set!** Volunteer by Krow is ready for development and production deployment.
