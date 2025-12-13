import { useState } from "react";
import axios from "axios";

type Status = "idle" | "loading" | "success" | "error";

interface User {
    id: number,
    name: string
}

export default function RandomUser() { 

    const [status, setStatus] = useState<Status>("idle");
    const [users, setUsers] = useState<User[]>([]);

    async function fetchUser() {
        try {
            setStatus("loading");
            const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
            setUsers(response.data);
            setStatus("success");
        } catch {
            setStatus("error")
        } 
    };

    function reset() { 
        setUsers([]);
        setStatus("idle");
    }


    return (
        <>
            <button onClick={fetchUser}>Load users</button>
            <button onClick={reset}>Reset</button>
            
            {status === "idle" && <p>Load users to start</p>}
            {status === "loading" && <p>Loading...</p>}
            {status === "error" && <p>Error...</p>}
            {status === "success" && 
                <ul>
                    {
                        users.map((user) => (
                            <li key={user.id}>{user.name}</li>
                        ))
                    }
                </ul>
            }
        </>
    );

}