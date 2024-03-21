import { RestoredImage } from ".";
import { SectionName } from "./context";
import { FilePreview } from "./filePreview";

interface ImageVersion {
  original: FilePreview;
  restored?: FilePreview | null;
}

export interface ActiveSectionStore {
  activeOption: SectionName;
  setActiveOption: (section: SectionName) => void;
  file: FilePreview | null;
  setFile: (file: FilePreview | null) => void;
  fileToProcess: { path: string } | null;
  setFileToProcess: (fileToProcess: { path: string } | null) => void;
  restoredFile: FilePreview | null;
  setRestoredFile: (restoredFile: FilePreview | null) => void;
  restoredImages: RestoredImage[] | null;
  setRestoredImages: (restoredImages: RestoredImage[] | null) => void;
  publicUrl: string;
  setPublicUrl: (publicUrl: string) => void;

  //imageRevisions: ImageVersion[];
  imageRevisions: ({ original: FilePreview; restored: FilePreview | null; })[];
  setImageRevisions: (file: FilePreview, restoredFile: FilePreview) => void;
}
