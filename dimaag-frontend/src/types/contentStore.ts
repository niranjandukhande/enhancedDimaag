import { contentType } from "./content";

export interface contentStore {
    contents : contentType[] | null;
    getContents: ()=> contentType[] | null;
    setContents: (content: contentType[])=> void;
}