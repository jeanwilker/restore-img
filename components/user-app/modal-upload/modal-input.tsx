import { useImageDrop } from '@/hooks/useImageDrop';
import useUserActions from '@/store/useUserActions';
import { useDropzone } from 'react-dropzone';

const ModalImput = () => {
  const { file, setFile, setFileToProcess } = useUserActions();
  const { onDrop } = useImageDrop({ setFile, setFileToProcess });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
    },
  });

  return (
    <>
      {!file && (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Solre o arquivo aqui...</p>
          ) : (
            <p className="flex items-center justify-center bg-blue-100 opacity-70 border border-dashed border-blue-300 rounded-md p-6 h-36">
              Arraste ou clique para selecionar um a...
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default ModalImput;
