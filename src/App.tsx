
import './App.css'
// import UserLoader from './components/UserLoader/UserLoader'
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserList from './components/UserLoader/UserList';
import UserDetails from './components/UserLoader/UserDetails';
import type { User } from './types/user';

type Status = "idle" | "loading" | "success" | "error";

export default function App() {
  const [status, setStatus] = useState<Status>("idle");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedUser) console.log(selectedUser.id);
  }, [selectedUser]);

  const selectedUserId = selectedUser?.id ?? null;

  async function fetchUser() {

    try {
      setStatus("loading");
      const response = await axios.get<User[]>(`https://jsonplaceholder.typicode.com/users`);
      setUsers(response.data);
      setStatus("success");
      setErrorMessage(null);
    } catch {
      setStatus("error");
      setErrorMessage("User not found");
    }
  };

  function reset() {
    setUsers([]);
    setStatus("idle");
    setErrorMessage(null);
    setSelectedUser(null);
  }

  function toggleUser(user: User) {
    if (user.id === selectedUser?.id) {
      setSelectedUser(null)
    } else { setSelectedUser(user) }
  }

  return (
    <>
      <button onClick={fetchUser} disabled={status === "loading"}>Load users</button>
      <button onClick={reset}>Reset</button>

      {status === "idle" && <p>Load users to start</p>}
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>{errorMessage}</p>}
      {status === "success" && 
        <ul>
          <UserList users={users} userId={selectedUserId} onSelect={toggleUser} />
        </ul>
      }
      <UserDetails user={ selectedUser } /> 
    </>
  );
  
}


