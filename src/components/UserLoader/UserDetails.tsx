import type { User } from "../../types/user";
import css from "./UserDetails.module.css"


interface UserDetailsPrpos{
    user: User | null
}

export default function UserDetails({ user }: UserDetailsPrpos) { 

    return (
        <p className={ css.border }>
            {user ? user.email : "Select a user"}
        </p>
    )
}