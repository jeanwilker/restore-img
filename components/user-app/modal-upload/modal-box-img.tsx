import { useImageSlider } from '@/hooks/useImageSlider';

import useUserActions from '@/store/useUserActions';
import Image from 'next/image';
import { useEffect } from 'react';
import Slider from './slider';
import useEnhanceImage from '@/hooks/useHandleEnhance';
import SliderImages from './slider-images';
import ImagePreview from './Img-preview';

const ModalImages = () => {
  const { file, restoredFile, imageRevisions, setImageRevisions } =
    useUserActions();

  const { processing } = useEnhanceImage();

  const {
    imageRevealFraction,
    imageContainerRef,
    handleTouchMove,
    handleMouseDown,
  } = useImageSlider();

  useEffect(() => {
    if (file && restoredFile?.name === file.name) {
      setImageRevisions(file, restoredFile);
    }
  }, [file, restoredFile, setImageRevisions]);

  return (
    <>
      {file && (
        <div className="px-2">
          <div
            ref={imageContainerRef}
            className="max-w-lg w-full mx-auto relative select-none group"
          >
            {processing && (
              <div className="absolute z-50 inset-0 bg-white opacity-50 text-center">
                loading...
              </div>
            )}

            <ImagePreview imageRevealFraction={imageRevealFraction}>
              <Slider
                imageRevealFraction={imageRevealFraction}
                handleMouseDown={handleMouseDown}
                handleTouchMove={handleTouchMove}
              />
            </ImagePreview>
          </div>

          <SliderImages />
        </div>
      )}
    </>
  );
};

export default ModalImages;
