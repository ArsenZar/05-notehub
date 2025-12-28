import { useState } from "react";
import { fetchNotes } from "./services/noteService";
import { useQuery } from "@tanstack/react-query";

export default function App() {

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string | undefined>();

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
    placeholderData: prev => prev
  });

  const notes = data?.notes;
  
  

  return (
    <>
      
    </>
  );
}
