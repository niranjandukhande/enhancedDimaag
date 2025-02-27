import { contentType } from '@/types/content';
import { contentStore } from '@/types/contentStore';
import { create } from 'zustand';

export const useContentStore = create<contentStore>((set) => ({
  contents: null,

  setContents: (contents: contentType[]) => {
    set({
      contents,
    });
  },
}));
