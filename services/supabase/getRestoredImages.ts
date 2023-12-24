'use server';
import { supabaseServerClient } from './supabaseServerClient';
import { SectionName } from '@/types/context';

export const getRestoredImages = async (activeOption: SectionName) => {
  const { data: restoredImages } = await supabaseServerClient.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER)
    .list(
      `${process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_RESTORED}/${activeOption}`,
      {
        limit: 10,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      },
    );

  const {
    data: { publicUrl },
  } = supabaseServerClient.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER)
    .getPublicUrl(
      `${process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_RESTORED}/${activeOption}`,
    );

  return { restoredImages, publicUrl };
};
