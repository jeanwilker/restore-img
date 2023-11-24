import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { RedirectType, redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { PlusCircleIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Sidebar } from '@/components/user-app/user-app-sidebar';
import UserAppHeader from '@/components/user-app/user-app-header';
import { ImageUploadPlaceholder } from '@/components/user-app/img-upload-placeholder';
import { UserAppImages } from '@/components/user-app/user-app-images';

const UserApp = async () => {
  let loggedIn = false;
  const supabase = createServerComponentClient({ cookies });

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      loggedIn = true;
    }
  } catch (error) {
    console.log('UserApp:', error);
  } finally {
    if (!loggedIn) {
      redirect('/', RedirectType.replace);
    }
  }

  const { data: restoredImages } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER)
    .list(process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_RESTORED, {
      limit: 10,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    });

  const {
    data: { publicUrl },
  } = supabase.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER)
    .getPublicUrl(
      process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_RESTORED,
    );

  return (
    <section className="md:block">
      <UserAppHeader />

      <div className="border-t">
        <div className="bg-background">
          <div className="grid lg:grid-cols-5">
            <Sidebar className="hidden lg:block" />
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="h-full px-4 py-6 lg:px-8">
                <Tabs defaultValue="fotos" className="h-full space-y-6">
                  <div className="space-between flex items-center">
                    <TabsList>
                      <TabsTrigger value="fotos" className="relative">
                        Fotos
                      </TabsTrigger>
                      <TabsTrigger value="documentos">Documentos</TabsTrigger>
                      <TabsTrigger value="outros" disabled>
                        Outros
                      </TabsTrigger>
                    </TabsList>
                    <div className="ml-auto mr-4">
                      <Button>
                        <PlusCircleIcon className="mr-2 h-4 w-4" />
                        Add Colection
                      </Button>
                    </div>
                  </div>
                  <TabsContent
                    value="fotos"
                    className="border-none p-0 outline-none"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Coleção de fotos
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          As fotos que você já aprimorou
                        </p>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <ImageUploadPlaceholder />
                      <ScrollArea>
                        <div
                          className="grid grid-cols-1
                        sm:grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-4
                        gap-2 justify-evenly"
                        >
                          {restoredImages?.map((restoredImage) => (
                            <UserAppImages
                              key={restoredImage.name}
                              image={restoredImage}
                              className="w-[250px]"
                              aspectRatio="square"
                              width={250}
                              height={330}
                              publicUrl={publicUrl}
                            />
                          ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </div>
                    <Separator className="my-4" />
                  </TabsContent>
                  <TabsContent
                    value="documentos"
                    className="h-full flex-col border-none p-0 data-[state=active]:flex"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          New Episodes
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Your favorite documentos. Updated daily.
                        </p>
                      </div>
                    </div>
                    <Separator className="my-4" />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserApp;
