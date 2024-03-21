import useUserActions from '@/store/useUserActions';
import Image from 'next/image';

interface ImageVersion {
  children: React.ReactNode;
  imageRevealFraction: number;
}

const ImagePreview = ({ children, imageRevealFraction }: ImageVersion) => {
  const { file, restoredFile } = useUserActions();

  return (
    <>
      <Image
        src={file?.preview!}
        width={384}
        height={384}
        alt="currentImage preview"
        onLoad={() => {
          URL.revokeObjectURL(file?.preview!);
        }}
        className="pointer-events-none"
      />

      {file?.name === restoredFile?.name && (
        <>
          <Image
            src={restoredFile?.preview!}
            style={{
              clipPath: `polygon(0 0, ${imageRevealFraction * 100}% 0, ${
                imageRevealFraction * 100
              }% 100%, 0 100%)`,
            }}
            className="absolute inset-0 pointer-events-none"
            width={384}
            height={384}
            alt="restoredImage preview"
            onLoad={() => {
              URL.revokeObjectURL(restoredFile?.preview!);
            }}
          />

          {children}
        </>
      )}
    </>
  );
};

export default ImagePreview;
