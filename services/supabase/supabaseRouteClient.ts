import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const supabaseRouteClient = createRouteHandlerClient({ cookies });
