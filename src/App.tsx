import { useState } from "react";
import { fetchNotes } from "./services/noteService";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import ReactPaginate from "react-paginate";
import Modal from "./components/Modal/Modal";

export default function App() {

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => { 
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
  }

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
    placeholderData: prev => prev
  });

  console.log(data);

  const notes = data?.notes;
  const totalPages = data?.totalPages ?? 0;

  const enterInput = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim();
    if (query !== "") {
      setSearch(query);
      setPage(1);
    } else {
      setSearch(undefined);
      setPage(1);
    }
  }, 1000);

  return (
    <>
      <input type="text" name="query" defaultValue={search} onChange={enterInput} />
      <button onClick={openModal}>Create note +</button>
    {(isLoading || isFetching) && <p>Loading...</p>}
      {isError && <p>Error...</p>}
      {<ReactPaginate
        pageCount={totalPages}
        onPageChange={({ selected }) => setPage(selected + 1)}
        forcePage={page - 1}
        nextLabel="→"
        previousLabel="←"

      />}
    <ul>
      { 
        notes?.map((note) => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <span>{ note.tag }</span>
          </li>
        ))
      }
      </ul>

      {isModalOpen && <Modal onClose={closeModal} />}
    </>
  );
}
