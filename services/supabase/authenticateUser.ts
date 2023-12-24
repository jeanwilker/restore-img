import { supabaseServerClient } from './supabaseServerClient';
import { RedirectType, redirect } from 'next/navigation';

export const authenticateUser = async () => {
  let loggedIn = false;

  try {
    const {
      data: { session },
    } = await supabaseServerClient.auth.getSession();

    if (session) {
      loggedIn = true;
    }
  } catch (error) {
    console.log('Home:', error);
  } finally {
    if (!loggedIn) {
      redirect('/', RedirectType.replace);
    }
  }
};
