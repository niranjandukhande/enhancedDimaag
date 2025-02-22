import { contentType } from './content';

export interface contentStore {
  contents: contentType[] | null;

  setContents: (content: contentType[]) => void;
}
