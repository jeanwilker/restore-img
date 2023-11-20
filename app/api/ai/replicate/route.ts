import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

interface NextRequestWithImage extends NextRequest {
  imageUrl: string;
}

export async function POST(req: NextRequestWithImage, res: NextResponse) {
  const { imageUrl } = await req.json();

  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (!session || error)
    new NextResponse('Faça login para restaurar a imagem', { status: 500 });

  const startRestoreProcess = await fetch(
    'https://api.replicate.com/v1/predictions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      },
      body: JSON.stringify({
        version:
          '9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3',
        input: {
          img: imageUrl,
          scale: 2,
          version: 'v1.4',
        },
      }),
    },
  );

  let jsonStartRestoreProcess = await startRestoreProcess.json();
  let endpointUrl = jsonStartRestoreProcess.urls.get;

  let restoredImage: string | null = null;

  while (!restoredImage) {
    let finalResponse = await fetch(endpointUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      },
    });

    let jsonFinalResponse = await finalResponse.json();
    if (jsonFinalResponse.status === 'succeeded') {
      restoredImage = jsonFinalResponse.output;
    } else if (jsonFinalResponse.status === 'failed') {
      break;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return NextResponse.json(
    { data: restoredImage ? restoredImage : 'Falha ao restaurar a imagem ' },
    { status: 200 },
  );
}
