import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import useUserActions from '@/store/useUserActions';
import useProcessing from '@/store/useProcessing';

const useEnhanceImage = () => {
  const { processing, setProcessing } = useProcessing();
  const { fileToProcess, setRestoredFile, file, setFile, activeOption } =
    useUserActions();

  const enhanceImage = async () => {
    try {
      setProcessing(true);

      const supabase = createClientComponentClient();
      const {
        data: { publicUrl },
      } = supabase.storage
        .from(process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER)
        .getPublicUrl(`${fileToProcess?.path}`);

      const res = await fetch(`/api/ai/${activeOption.toLowerCase()}`, {
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
          `${process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_RESTORED}/${activeOption}/${file?.name}`,
          imageBlob,
        );

      if (error) {
        setRestoredFile(null);
      }
    } catch (error) {
      console.log('useEnhanceImage_Error:', error);
      setFile(null);
      setRestoredFile(null);
    } finally {
      setProcessing(false);
    }
  };
  return { enhanceImage, processing };
};

export default useEnhanceImage;
