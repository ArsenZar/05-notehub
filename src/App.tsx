import noteService from "./services/noteService";

export default function App() {
  
  noteService("").then(responce => console.log(responce.notes));

  return (
    <>
      
    </>
  );
}
