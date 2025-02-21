import { contentType } from "@/types/content";
import { contentStore } from "@/types/contentStore";
import {create} from "zustand";

export const useContentStore= create<contentStore>((set,get)=>({
    contents: null,
    getContents: ()=>{
        const state = get();
        return state.contents? state.contents: null;
    },
    setContents: (contents: contentType[])=>{
        set({
            contents
        })
    }
}))