
import './App.css'
// import UserLoader from './components/UserLoader/UserLoader'
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserList from './components/UserLoader/UserList';
import UserDetails from './components/UserLoader/UserDetails';
import type { User } from './types/user';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function App() {
  // const [status, setStatus] = useState<Status>("idle");
  // const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const queryClient = useQueryClient();
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedUserId = selectedUser?.id ?? null;

  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    enabled: false
  });

  useEffect(() => {
    if (selectedUser) console.log(selectedUser?.id);
  }, [selectedUser]);

  const users = data ?? [];

  async function fetchUsers(){ 
    const response = await axios.get<User[]>(`https://jsonplaceholder.typicode.com/users`);
    return response.data;
  }

  function reset() {
    setSelectedUser(null);
    queryClient.removeQueries({ queryKey: ['users'] });
  }

  function toggleUser(user: User) {
    if (user.id === selectedUser?.id) {
      setSelectedUser(null)
    } else { setSelectedUser(user) }
  }

  return (
    <>
      <button onClick={() => refetch()} disabled={isLoading}>Load users</button>
      <button onClick={reset}>Reset</button>
      { isError && `Error: ${error}`}
      {isSuccess &&
        <ul>
          <UserList users={users} userId={selectedUserId} onSelect={toggleUser} />
        </ul>
      }
      
      <UserDetails user={ selectedUser } />
    
    </>
  );
}


