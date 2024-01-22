import { useImageDrop } from '@/hooks/useImageDrop';
import useUserActions from '@/store/useUserActions';
import { useDropzone } from 'react-dropzone';

const useCustomDropzone = () => {
  const { setFile, setFileToProcess } = useUserActions();
  const { onDrop } = useImageDrop({ setFile, setFileToProcess });

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
    },
    noClick: true,
    noKeyboard: true,
  });

  return {
    rootProps: { ...getRootProps() },
    inputProps: { ...getInputProps() },
    isDragActive,
    open,
  };
};

export default useCustomDropzone;
