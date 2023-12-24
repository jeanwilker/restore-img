import { NextRequest, NextResponse } from 'next/server';
import { supabaseRouteClient } from '@/services/supabase/supabaseRouteClient';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  try {
    if (code) {
      await supabaseRouteClient.auth.exchangeCodeForSession(code);
    }
  } catch (error) {
    console.log('Auth_Callback:', error);
  }

  return NextResponse.redirect(requestUrl.origin);
}
