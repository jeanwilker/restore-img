import { NextRequest, NextResponse } from 'next/server';
import { startRestoreProcess } from '@/functions/startRestoreProcess';

interface NextRequestWithImage extends NextRequest {
  imageUrl: string;
}

export async function POST(req: NextRequestWithImage, res: NextResponse) {
  const { imageUrl } = await req.json();

  const result = await startRestoreProcess({
    version: '0da600fab0c45a66211339f1c16b71345d22f26ef5fea3dca1bb90bb5711e950',
    input: {
      model_name: 'Artistic',
      input_image: imageUrl,
      render_factor: 35,
    },
  });

  return result;
}
