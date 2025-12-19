import type { User } from "../../types/user";

interface UserListProps {
    users: User[],
    onSelect: (user: User) => void
}

export default function UserList({ users, onSelect }: UserListProps) {
    
    return (
        users.map( 
            (user) => (
                <li key={user.id} onClick={() => onSelect(user)}>
                    {user.name}
                </li>
            )
        )
        
    );
}