import { Button } from '@/components/ui/button';
import useCustomDropzone from '@/lib/dropzone/useDropzone';
import useUserActions from '@/store/useUserActions';

const ModalImput = () => {
  const { file } = useUserActions();
  const { rootProps, inputProps, isDragActive, open } = useCustomDropzone();

  return (
    <>
      {!file && (
        <div
          {...rootProps}
          className="flex flex-col gap-4 items-center justify-center bg-blue-100 border border-dashed border-blue-300 rounded-md p-6 h-36"
        >
          <input {...inputProps} />
          {isDragActive ? (
            <p>Solre o arquivo aqui...</p>
          ) : (
            <p>Arraste ou clique botão para selecionar uma imagem</p>
          )}
          <Button type="button" onClick={open}>
            Add Imagem
          </Button>
        </div>
      )}
    </>
  );
};

export default ModalImput;
