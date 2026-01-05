import { useState } from "react";
import { fetchNotes } from "./services/noteService";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import ReactPaginate from "react-paginate";
import Modal from "./components/Modal/Modal";
import css from "./App.module.css";
import SearchBox from "./components/SearchBox/SearchBox";
import NoteList from "./components/NoteList/NoteList";

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
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={ search } onChange={ enterInput }/>
          {/* <input type="text" name="query" defaultValue={search} onChange={enterInput} /> */}
          {(isLoading || isFetching) && <p>Loading...</p>}
          {isError && <p>Error...</p>}
          {<ReactPaginate
            className={css.toolbar} 
            pageCount={totalPages}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
            nextLabel="→"
            previousLabel="←"
          />}
          <button className={ css.button } onClick={openModal}>Create note +</button>
        </header>
      </div>
      
      <NoteList notes={ notes } />

      {isModalOpen && <Modal onClose={closeModal} />}
    </>
  );
}

