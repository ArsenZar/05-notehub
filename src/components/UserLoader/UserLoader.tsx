import axios from "axios";
import { useState, useEffect } from "react";

interface User { 
    id: number,
    name: string
}

export default function UserLoader() {

    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchUser() {
            try {
                setLoading(true);
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                setUsers(response.data);
            } catch {
                setError(true);
                
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
        
    }, []);

    return (
    <>
        {loading && <p>Loading...</p>}
        {error && <p>Error...</p>}
        
        {!loading && !error &&
        <ul>
            {
                users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))
            }
        </ul>
        }
    </>
    )

}