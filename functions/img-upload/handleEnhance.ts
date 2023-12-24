import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FilePreview } from '@/types/filePreview';

export const handleEnhance = async (
  fileToProcess: { path: string } | null,
  setRestoredFile: (file: FilePreview | null) => void,
  file: FilePreview | null | undefined,
  setFile: (file: FilePreview | null) => void,
) => {

  try {
    const supabase = createClientComponentClient();
    const {
      data: { publicUrl },
    } = supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER)
      .getPublicUrl(`${fileToProcess?.path}`);

    const res = await fetch('/api/ai/face', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageUrl: publicUrl,
      }),
    });

    const restoredImageUrl = await res.json();
    const readImageRes = await fetch(restoredImageUrl.data);
    const imageBlob = await readImageRes.blob();

    setRestoredFile({
      file: imageBlob,
      preview: URL.createObjectURL(imageBlob),
      name: file?.name as string,
    });

    const { data, error } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER)
      .upload(
        `${process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_RESTORED}/${file?.name}`,
        imageBlob,
      );

    if (error) {
      setRestoredFile(null);
    }
  } catch (error) {
    console.log('handleEnhance_ImageUploadPlaceholder:', error);
    setFile(null);
    setRestoredFile(null);
  }
};
