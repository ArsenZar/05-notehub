
import './App.css'
// import UserLoader from './components/UserLoader/UserLoader'
import axios from "axios";
// 1. Імпортуємо хук useMutation
import { useMutation } from '@tanstack/react-query';

export default function App() {
  // 2. Використовуємо хук
  const mutation = useMutation({
    mutationFn: async (newTodo) => {
      const res = await axios.post('https://jsonplaceholder.typicode.com/todos', newTodo);
      return res.data;
    },
    onSuccess: () => {
      console.log("Todo added successfully");
    }
  });

  const handleCreateTodo = () => {
    // 3. Викликаємо mutate для того щоб виконати HTTP-запит
    mutation.mutate({
      title: "My new todo",
      completed: false
    })
  };

  return (
    <>
      <button onClick={handleCreateTodo}>Create Todo</button>
      {mutation.isPending && <div>Adding todo...</div>}
      {mutation.isError && <div>An error occurred</div>}
      {mutation.isSuccess && <div>Todo added!</div>}
    </>
  );
}
