import type { User } from "../../types/user";
import css from "./UserList.module.css";

interface UserListProps {
    users: User[],
    userId: number | null,
    onSelect: (user: User) => void
}



export default function UserList({ users, userId, onSelect }: UserListProps) {
    
    return (
        users.map( 
            (user) => (
                <li
                    key={user.id}
                    onClick={() => onSelect(user)}
                    className={user.id === userId ? css.active : "" }
                >
                    {user.name}
                </li>
            )
        )
        
    );
}