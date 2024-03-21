import { create } from "zustand";

interface Processing {
  processing: boolean;
  setProcessing: (value: boolean) => void;
}

const useProcessing = create<Processing>((set) => ({
  processing: false,
  setProcessing: (value) => set({ processing: value }),
}));

export default useProcessing;
