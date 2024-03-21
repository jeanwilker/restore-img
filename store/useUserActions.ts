import { ActiveSectionStore } from '@/types/activeSectionContextType';
import { FilePreview } from '@/types/filePreview';
import { create } from 'zustand';

interface FileHistoryItem {
  original: FilePreview;
  restored: FilePreview | null;
}

const useUserActions = create<ActiveSectionStore>((set) => ({
  activeOption: 'Fotos',
  setActiveOption: (section) => set({ activeOption: section }),
  file: null,
  setFile: (file) => set({ file }),
  fileToProcess: null,
  setFileToProcess: (fileToProcess) => set({ fileToProcess }),
  restoredFile: null,
  setRestoredFile: (restoredFile) => set({ restoredFile }),
  restoredImages: [],
  setRestoredImages: (restoredImages) => set({ restoredImages }),
  publicUrl: '',
  setPublicUrl: (publicUrl) => set({ publicUrl }),

  imageRevisions: [],
  setImageRevisions: (file, restoredFile) => {
    set((state) => ({
      imageRevisions: [
        ...state.imageRevisions,
        { original: file, restored: restoredFile },
      ],
    }));
  },
  resetImageRevisions: () => set({ imageRevisions: [] }),
}));

export default useUserActions;
