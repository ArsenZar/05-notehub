import axios from "axios";
import type { Post } from "../types/note";

interface fetchNotesResponce{
    notes: Post[]
}

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

export default async function fetchNotes(value: string): Promise<fetchNotesResponce> {
    console.log(myKey);
    
    const option = {
        params: {
            search: value,
            page: 1,
            perPage: 12,
            sortBy: 'created'
        },
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    }

    const res = await axios.get<fetchNotesResponce>('https://notehub-public.goit.study/api/notes', option);

    return res.data;
}