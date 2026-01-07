import type { Note } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService";
import css from "./NoteList.module.css";
import { useState } from "react";

interface NoteListProps {
    notes: Note[] | undefined;
    deletedId?: string;
}

export default function NoteList({ notes }: NoteListProps) {
    
    const [deletedId, setDeletedId] = useState<string | null>(null);

      const queryClient = useQueryClient();
    
      const mutation = useMutation({
          mutationFn: deleteNote,
          onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["notes"] });
              setDeletedId(null);
          },
      });

    return (
        <ul className={css.list}>
            {
                notes?.map((note) => (
                    <li className={css.listItem} key={note.id}>
                        <h2 className={css.title}>{note.title}</h2>
                        <p className={css.content}>{note.content}</p>
                        <div className={css.footer}>
                            <span className={css.tag}>{note.tag}</span>
                            <button className={css.button} onClick={() => {
                                setDeletedId(note.id);
                                mutation.mutate(note.id);
                            }}
                            >
                                { deletedId === note.id ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}