import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import useUserActions from '@/store/useUserActions';
import Image from 'next/image';

const SliderImages = () => {
  const { imageRevisions } = useUserActions();

  return (
    <>
      {imageRevisions.length > 0 && (
        <div className="relative pt-4 max-w-lg">
          <ScrollArea>
            <div className="flex justify-end flex-row-reverse gap-3">
              {imageRevisions.map((imageRevisions) => (
                <Image
                  key={imageRevisions.original.name}
                  src={imageRevisions.restored?.preview!}
                  alt={`preview ${imageRevisions.original.name}`}
                  className="sm:w-20 sm:h-24 w-16 h-20 shrink-0 object-cover rounded-md"
                  width={96}
                  height={96}
                  onClick={() => console.log(imageRevisions)}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      )}
    </>
  );
};

export default SliderImages;
