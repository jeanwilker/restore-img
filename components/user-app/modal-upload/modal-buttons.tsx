import { Button } from '@/components/ui/button';
import { downloadImage } from '@/functions/downloadImage';
import useEnhanceImage from '@/hooks/useHandleEnhance';
import useCustomDropzone from '@/lib/dropzone/useDropzone';
import useUserActions from '@/store/useUserActions';
import { useEffect } from 'react';

const ModalButtons = () => {
  const { file, restoredFile } = useUserActions();
  const { enhanceImage, processing } = useEnhanceImage();
  const { rootProps, open, inputProps } = useCustomDropzone();

  return (
    <>
      {file && (
        <>
          {file.name === restoredFile?.name ? (
            <Button
              onClick={() => downloadImage(restoredFile.name)}
              disabled={processing}
            >
              Download
            </Button>
          ) : (
            <Button
              onClick={() => {
                enhanceImage();
              }}
              disabled={file.name === restoredFile?.name || processing}
            >
              Melhorar
            </Button>
          )}

          <div {...rootProps}>
            <input {...inputProps} />
            <Button type="button" onClick={open} disabled={processing}>
              Nova Imagem
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default ModalButtons;
