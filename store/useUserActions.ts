import { ActiveSectionStore } from '@/types/activeSectionContextType';
import { create } from 'zustand';

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
}));

export default useUserActions;
