"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UserAppImages } from "../user-app-images";
import useUserActions from "@/store/useUserActions";
import { useEffect } from "react";
import { getRestoredImages } from "@/services/supabase/getRestoredImages";

const RestoredImagesArea = () => {
  const {
    activeOption,
    restoredImages,
    publicUrl,
    setRestoredImages,
    setPublicUrl,
  } = useUserActions();

  useEffect(() => {
    const fetchRestoredImages = async () => {
      const { restoredImages, publicUrl } = await getRestoredImages(
        activeOption
      );
      setRestoredImages(restoredImages);
      setPublicUrl(publicUrl);
    };

    fetchRestoredImages();
  }, [activeOption, setRestoredImages, setPublicUrl]);

  return (
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
  );
};

export default RestoredImagesArea;
