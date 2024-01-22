import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useImageSlider } from '@/hooks/useImageSlider';

import useCustomDropzone from '@/lib/dropzone/useDropzone';
import useUserActions from '@/store/useUserActions';
import { FilePreview } from '@/types/filePreview';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ModalImages = () => {
  const { file, restoredFile } = useUserActions();
  const [restoredFiles, setRestoredFiles] = useState<FilePreview[]>([]);
  const {
    imageRevealFraction,
    imageContainerRef,
    handleTouchMove,
    handleMouseDown,
  } = useImageSlider();

  const { rootProps, open, inputProps } = useCustomDropzone();

  useEffect(() => {
    if (restoredFile) {
      setRestoredFiles((prevStates) => [...prevStates, restoredFile]);
    }
  }, [restoredFile]);

  return (
    <>
      {/*{file && (
        <div className="flex flex-row flex-wrap drop-shadow-md">
          <div className="flex w-76 h-96">
            <Image
              src={file.preview}
              className="w-76 h-96 object-contain rounded-md"
              width={384}
              height={384}
              alt="preview"
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
            />
          </div>
        </div>
      )}*/}

      {file && restoredFile && (
        <div className="px-2">
          <div
            ref={imageContainerRef}
            className="max-w-lg w-full mx-auto relative select-none group"
          >
            <Image
              src={file.preview}
              width={384}
              height={384}
              alt="preview"
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
              className="pointer-events-none"
            />

            <Image
              src={restoredFile.preview}
              style={{
                clipPath: `polygon(0 0, ${imageRevealFraction * 100}% 0, 
                  ${imageRevealFraction * 100}% 100%, 0 100%) `,
              }}
              className="absolute inset-0 pointer-events-none"
              width={384}
              height={384}
              alt="preview"
              onLoad={() => {
                URL.revokeObjectURL(restoredFile.preview);
              }}
            />

            <div
              style={{ left: `${imageRevealFraction * 100}%` }}
              className="absolute inset-y-0 group-hover:opacity-100 sm:opacity-0"
            >
              <div className="relative h-full opacity-50 hover:opacity-100">
                <div className="absolute inset-0 bg-white w-0.5 -ml-px opacity-50"></div>
                <div
                  style={{ touchAction: 'none' }}
                  onMouseDown={handleMouseDown}
                  onTouchMove={handleTouchMove}
                  className="h-12 w-12 -ml-6 rounded-full bg-white absolute top-1/2 shadow-xl flex items-center justify-center cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 text-gray-600 rotate-90 transform"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/*{restoredFile && (
        <div className="flex flex-row flex-wrap drop-shadow-md">
          <div className="flex w-48 h-48">
            <Image
              src={restoredFile.preview}
              className="w-48 h-48 object-contain rounded-md"
              width={192}
              height={192}
              alt="preview"
              onLoad={() => {
                URL.revokeObjectURL(restoredFile.preview);
              }}
            />
          </div>
        </div>
            )}*/}

      {restoredFiles.length > 0 && (
        <div className="relative pt-4 max-w-lg">
          <ScrollArea>
            <div className="flex justify-end flex-row-reverse gap-3">
              {restoredFiles.map((restoredFile) => (
                <Image
                  key={restoredFile.name}
                  src={restoredFile.preview}
                  alt={`preview ${restoredFile.name}`}
                  className="sm:w-20 sm:h-24 w-16 h-20 shrink-0 object-cover rounded-md"
                  width={96}
                  height={96}
                  onClick={() => console.log(restoredFile)}
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

export default ModalImages;
