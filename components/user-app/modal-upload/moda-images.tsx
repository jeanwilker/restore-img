import useUserActions from '@/store/useUserActions';
import Image from 'next/image';

const ModalImages = () => {
  const { file, restoredFile } = useUserActions();

  return (
    <>
      {file && (
        <div className="flex flex-row flex-wrap drop-shadow-md">
          <div className="flex w-48 h-48">
            <Image
              src={file.preview}
              className="w-48 h-48 object-contain rounded-md"
              width={192}
              height={192}
              alt="preview"
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
            />
          </div>
        </div>
      )}

      {restoredFile && (
        <div className="flex flex-row flex-wrap drop-shadow-md">
          <div className="flex w-48 h-48">
            <Image
              src={restoredFile.preview}
              className="w-48 h-48 object-contain rounded-md"
              width={192}
              height={192}
              alt="preview"
              onLoad={() => {
                URL.revokeObjectURL(restoredFile.preview);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ModalImages;
