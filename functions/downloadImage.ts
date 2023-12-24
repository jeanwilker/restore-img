import useUserActions from '@/store/useUserActions';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const downloadImage = async (image: string) => {
  const { activeOption } = useUserActions.getState();

  const supabase = createClientComponentClient();
  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER)
    .download(
      `${process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_RESTORED}/${activeOption}/${image}`,
    );

  if (data) {
    const url = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = image;
    link.click();
    URL.revokeObjectURL(url);
  }
};
