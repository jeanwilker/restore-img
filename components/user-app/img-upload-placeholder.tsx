'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { handleEnhance } from '@/functions/img-upload/handleEnhance';
import { useImageDrop } from '@/hooks/useImageDrop';
import { FilePreview } from '@/types/filePreview';
import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function ImageUploadPlaceholder() {
  const router = useRouter();
  const [file, setFile] = useState<FilePreview | null>();
  const [fileToProcess, setFileToProcess] = useState<{
    path: string;
  } | null>(null);
  const [restoredFile, setRestoredFile] = useState<FilePreview | null>();

  const { onDrop } = useImageDrop({ setFile, setFileToProcess });

  useEffect(() => {
    return () => {
      if (file) URL.revokeObjectURL(file.preview);
      if (restoredFile) URL.revokeObjectURL(restoredFile.preview);
    };
  }, [file, restoredFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
    },
  });

  const handleDialogOpenChange = async (open: boolean) => {
    if (!open) {
      setFile(null);
      setFileToProcess(null);
      setRestoredFile(null);
      router.refresh();
    }
  };

  return (
    <div className="flex h-[200px] w-full shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-10 w-10 text-muted-foreground"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="11" r="1" />
          <path d="M11 17a1 1 0 0 1 2 0c0 .5-.34 3-.5 4.5a.5.5 0 0 1-1 0c-.16-1.5-.5-4-.5-4.5ZM8 14a5 5 0 1 1 8 0" />
          <path d="M17 18.5a9 9 0 1 0-10 0" />
        </svg>

        <h3 className="mt-4 text-lg font-semibold">Nenhuma foto adicionada</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          A foto que você adicionar será aprimorada pela AI.
        </p>
        <Dialog onOpenChange={handleDialogOpenChange}>
          <DialogTrigger asChild>
            <Button size="sm" className="relative">
              Adicionar Foto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Foto</DialogTitle>
              <DialogDescription>
                Arrastar uma foto para fazer upload e aprimorá-la.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                {!file && (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>Solre os arquivos aqui...</p>
                    ) : (
                      <p className="flex items-center justify-center bg-blue-100 opacity-70 border border-dashed border-blue-300 rounded-md p-6 h-36">
                        Arraste ou clique para selecionar uma imagem...
                      </p>
                    )}
                  </div>
                )}
                <div className="flex flex-col items-center justify-evenly sm:flex-row gap-2">
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
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={() => {
                  handleEnhance(fileToProcess, setRestoredFile, file, setFile);
                }}
              >
                Melhorar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
