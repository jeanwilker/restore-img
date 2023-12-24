import { RedirectType, redirect } from 'next/navigation';
import { supabaseServerClient } from '@/services/supabase/supabaseServerClient';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CreateAccountForm from '@/components/auth/create-account-form';
import LogginAccountForm from '@/components/auth/loggin-account-form';

export default async function Home() {
  let loggedIn = false;
  try {
    const {
      data: { session },
    } = await supabaseServerClient.auth.getSession();

    if (session) {
      loggedIn = true;
    }
  } catch (error) {
    console.log('home:', error);
  } finally {
    if (loggedIn) {
      redirect('/user-app', RedirectType.replace);
    }
  }

  return (
    <section className="flex flex-col justify-center items-center h-screen w-full">
      <Tabs
        defaultValue="create-account"
        className="w-[400px] border rounded-md pb-10 shadow-md"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create-account">Account</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>

        <TabsContent value="create-account">
          <CreateAccountForm />
        </TabsContent>
        <TabsContent value="login">
          <LogginAccountForm />
        </TabsContent>
      </Tabs>
    </section>
  );
}
