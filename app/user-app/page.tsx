import { PlusCircleIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent } from '@/components/ui/tabs';

import { Sidebar } from '@/components/user-app/user-app-sidebar';
import UserAppHeader from '@/components/user-app/user-app-header';
import { ImageUploadPlaceholder } from '@/components/user-app/img-upload-placeholder';
import RestoredImagesArea from '@/components/user-app/restored-images-area/restored-images-area';
import OptionsList from '@/components/user-app/options-list';
import { authenticateUser } from '@/services/supabase/authenticateUser';

export const links = [
  { name: 'Fotos', hash: 'fotos' },
  { name: 'Colorizar', hash: 'colorizar' },
] as const;

const Home = async () => {
  await authenticateUser();

  return (
    <section className="md:block">
      <UserAppHeader />

      <div className="border-t">
        <div className="bg-background">
          <div className="grid lg:grid-cols-5 border-t">
            <Sidebar className="hidden lg:block" />
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="h-full px-4 py-6 lg:px-8">
                <Tabs defaultValue="fotos" className="h-full space-y-6">
                  <div className="space-between flex items-center">
                    <OptionsList />
                    <div className="ml-auto mr-4">
                      <Button>
                        <PlusCircleIcon className="mr-2 h-4 w-4" />
                        Add Colection
                      </Button>
                    </div>
                  </div>
                  <div>
                    {links.map((link) => (
                      <TabsContent
                        key={link.hash}
                        value={link.hash}
                        className="border-none p-0 outline-none"
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                              {`Coleção de ${link.name}`}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              {`As imagens de ${link.name} que você já aprimorou`}
                            </p>
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="flex flex-col items-center justify-center space-y-2">
                          <ImageUploadPlaceholder />
                          <RestoredImagesArea />
                        </div>

                        <Separator className="my-4" />
                      </TabsContent>
                    ))}
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
