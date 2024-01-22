import { Button } from '@/components/ui/button';
import { downloadImage } from '@/functions/downloadImage';
import useEnhanceImage from '@/hooks/useHandleEnhance';
import useCustomDropzone from '@/lib/dropzone/useDropzone';
import useUserActions from '@/store/useUserActions';

const ModalButtons = () => {
  const { file, restoredFile } = useUserActions();
  const { enhanceImage, processing } = useEnhanceImage();

  const { rootProps, open, inputProps } = useCustomDropzone();

  return (
    <>
      {/*{!file || restoredFile ? (
        <Button disabled> Melhorar </Button>
      ) : (
        <Button
          onClick={() => {
            enhanceImage();
          }}
        >
          Melhorar
        </Button>
      )}

      {restoredFile && (
        <Button onClick={() => downloadImage(file?.name as string)}>
          Download
        </Button>
      )}*/}

      {file && (
        <>
          <Button
            onClick={() => {
              enhanceImage();
            }}
          >
            Melhorar
          </Button>

          <div {...rootProps}>
            <input {...inputProps} />
            <Button type="button" onClick={open}>
              Nova Imagem
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default ModalButtons;
