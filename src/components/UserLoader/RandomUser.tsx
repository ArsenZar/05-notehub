import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function RandomUser() { 

    const [status, setStatus] = useState<Status>("idle");

    

    return (
        <>
            <button onClick={}>Load users</button>
            <button onClick={}>Reset</button>
        </>
    );

}