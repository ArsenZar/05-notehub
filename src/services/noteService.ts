import axios from "axios";
import type { Note, CreateNote } from "../types/note";

interface FetchNotesResponse{
    notes: Note[];
    totalPages: number;
}

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

export const createNote = async (note: CreateNote): Promise<Note> => {
    const res = await axios.post<Note>(
        "https://notehub-public.goit.study/api/notes",
        note,
        {
            headers: {
                Authorization: `Bearer ${myKey}`,
            },
        }
    );

    return res.data;
};

export const deleteNote = async (noteId: Note["id"]): Promise<Note> => {
    const res = await axios.delete<Note>(
        `https://notehub-public.goit.study/api/notes/${noteId}`,

        {
            headers: {
                Authorization: `Bearer ${myKey}`,
            },
        }
    );

    return res.data;
};

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