
import './App.css'
// import UserLoader from './components/UserLoader/UserLoader'
import React, { useEffect, useState } from "react";
import axios from "axios";

type Status = "idle" | "loading" | "success" | "error";

interface User {
  id: number,
  name: string
}

export default function App() {
  const [status, setStatus] = useState<Status>("idle");
  const [user, setUsers] = useState<User | null>(null);
  const [id, setId] = useState<number | "">("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) console.log(user);
  }, [user]);

  async function fetchUser() {
    if (id === "") {
      setStatus("error");
      setErrorMessage("Enter id");
      return;
    }
    if (id <= 0) {
      setStatus("error");
      setErrorMessage("Enter id > 0");
      return;
    }

    try {
      setStatus("loading");
      const response = await axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(response.data);
      setStatus("success");
      setErrorMessage(null);
    } catch {
      setStatus("error");
      setErrorMessage("User not found");
    }
  };

  function reset() {
    setUsers(null);
    setStatus("idle");
    setId("");
    setErrorMessage(null);
  }

  function changeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setId(value === "" ? "" : Number(value));
  }

  return (
    <>
      <input type="number" value={id} onChange={changeInput} />
      <button onClick={fetchUser} disabled={status === "loading" || id === ""}>Load users</button>
      <button onClick={reset}>Reset</button>

      {status === "idle" && <p>Load users to start</p>}
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>{errorMessage}</p>}
      {status === "success" && user &&
        <p> {user.name} </p>
      }
    </>
  );
  
}


