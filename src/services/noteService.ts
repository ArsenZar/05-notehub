import axios from "axios";
import type { Note } from "../types/note";

interface FetchNotesResponse{
    notes: Note[],
    totalPages: string
}

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

export async function fetchNotes(page: number, search?: string): Promise<FetchNotesResponse> {

    const option = {
        params: {
            search,
            page,
            perPage: 12
        },
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    }

    const res = await axios.get<FetchNotesResponse>('https://notehub-public.goit.study/api/notes', option);

    return res.data;
}