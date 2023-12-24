import { Button } from '@/components/ui/button';
import { downloadImage } from '@/functions/downloadImage';
import useEnhanceImage from '@/hooks/useHandleEnhance';
import useUserActions from '@/store/useUserActions';

const ModalButtons = () => {
  const {file, restoredFile} = useUserActions();
  const { enhanceImage, processing } = useEnhanceImage();

  return (
    <>
      {!file || restoredFile ? (
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
      )}
    </>
  );
};

export default ModalButtons;
