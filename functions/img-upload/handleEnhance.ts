import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface PropsHandleEnhance {
  path: string;
}

interface FilePreview {
  file: Blob;
  preview: string;
}

export const handleEnhance = async (
  fileToProcess: PropsHandleEnhance | null,
  setRestoredFile: (file: FilePreview | null) => void,
) => {
  try {
    const supabase = createClientComponentClient();
    const {
      data: { publicUrl },
    } = supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER)
      .getPublicUrl(`${fileToProcess?.path}`);

    const res = await fetch('/api/ai/replicate', {
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
    });
  } catch (error) {
    console.log('handleEnhance_ImageUploadPlaceholder:', error);
  }
};
