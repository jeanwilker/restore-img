import { supabaseRouteClient } from '@/services/supabase/supabaseRouteClient';
import { NextResponse } from 'next/server';

interface RestoreProcessRequestBody {
  version: string;
  input: {
    model_name?: string;
    img?: string;
    scale?: number;
    version?: string;
    input_image?: string;
    render_factor?: number;
  };
}

export async function startRestoreProcess(
  versionApi: RestoreProcessRequestBody,
) {
  const {
    data: { session },
    error,
  } = await supabaseRouteClient.auth.getSession();

  if (!session || error) {
    return new NextResponse('Faça login para restaurar a imagem', {
      status: 500,
    });
  }

  const startRestoreProcess = await fetch(
    'https://api.replicate.com/v1/predictions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      },
      body: JSON.stringify({
        version: versionApi.version,
        input: versionApi.input || {},
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
    { data: restoredImage ?? 'Falha ao restaurar a imagem ' },
    { status: 200 },
  );
}
