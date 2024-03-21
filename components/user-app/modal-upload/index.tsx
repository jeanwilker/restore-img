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
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BoxImages from './modal-box-img';
import ModalButtons from './modal-buttons';
import ModalImput from './modal-input';
import useUserActions from '@/store/useUserActions';

const ModalUpload = () => {
  const router = useRouter();
  const {
    file,
    setFile,
    setFileToProcess,
    restoredFile,
    setRestoredFile,
    resetImageRevisions,
  } = useUserActions();

  useEffect(() => {
    return () => {
      if (file) URL.revokeObjectURL(file.preview);
      if (restoredFile) URL.revokeObjectURL(restoredFile.preview);
    };
  }, [file, restoredFile]);

  const handleDialogOpenChange = async (open: boolean) => {
    if (!open) {
      setFile(null);
      setFileToProcess(null);
      setRestoredFile(null);
      resetImageRevisions();
      router.refresh();
    }
  };

  return (
    <Dialog onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="relative">
          Adicionar arquivo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Adicionar arquivo</DialogTitle>
          <DialogDescription>
            Arrastar um arquivo para fazer upload e aprimorá-lo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <ModalImput />
            <div className="flex flex-col items-center justify-between gap-2">
              <BoxImages />
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <ModalButtons />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpload;
