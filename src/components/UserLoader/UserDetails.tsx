import type { User } from "../../types/user";

interface UserDetailsPrpos{
    user: User | null
}

export default function UserDetails({ user }: UserDetailsPrpos) { 

    return (
        <p>
            {user ? user.email : "Select a user"}
        </p>
    )
}