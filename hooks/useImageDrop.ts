// useImageDrop.ts
import { useCallback } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FilePreview } from '@/types/filePreview';

interface UseImageDropProps {
  setFile: (file: FilePreview | null) => void;
  setFileToProcess: (file: { path: string } | null) => void;
}

export const useImageDrop = ({
  setFile,
  setFileToProcess,
}: UseImageDropProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const handleDrop = async () => {
        try {
          const file = acceptedFiles[0];

          setFile({
            file,
            preview: URL.createObjectURL(file),
          });

          const supabase = createClientComponentClient();
          const { data, error } = await supabase.storage
            .from(process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER)
            .upload(
              `${process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_PROCESSING}/${acceptedFiles[0].name}`,
              acceptedFiles[0],
            );

          if (!error) {
            setFileToProcess(data);
          }
        } catch (error) {
          console.log('onDrop_ImageUploadPlaceholder', error);
        }
      };

      handleDrop();
    },
    [setFile, setFileToProcess],
  );

  return { onDrop };
};
