import { createClient } from '@/lib/supabase/client';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const role = requestUrl.searchParams.get('role') === 'organizer' ? 'organizer' : 'volunteer';
  const origin = requestUrl.origin;

  if (code) {
    const supabase = createClient();
    const { data } = await supabase.auth.exchangeCodeForSession(code);
    
    if (data?.session?.user) {
      try {
        await supabase.from('users').upsert({
          id: data.session.user.id,
          email: data.session.user.email,
          role: role,
          name: data.session.user.user_metadata?.full_name || data.session.user.user_metadata?.name || '',
          avatar_url: data.session.user.user_metadata?.avatar_url || data.session.user.user_metadata?.picture || null,
        });
      } catch (err) {
        console.error('OAuth user upsert note:', err);
      }
    }
  }

  const destination = role === 'organizer' ? '/onboarding/organizer' : '/onboarding/volunteer';
  return NextResponse.redirect(`${origin}${destination}`);
}
