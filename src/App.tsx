
import './App.css'
// import UserLoader from './components/UserLoader/UserLoader'
import axios from "axios";
// 1. Імпортуємо хук useMutation
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

type NewTodo = {
  title: string;
  completed: boolean;
};

type TodoResponse = { id: number } & NewTodo ;

export default function App() {

  // const fethchTodos = useQuery({
  //   queryKey: ['todos'],
  //   queryFn: async () => {
  //     const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
  //     return res.data;
  //   },
  // });

  const queryClient = useQueryClient();
  
  // 2. Використовуємо хук
  const mutation = useMutation<TodoResponse, Error, NewTodo>({
    mutationFn: async (newTodo) => {
      const res = await axios.post<TodoResponse>('https://jsonplaceholder.typicode.com/todos', newTodo);
      return res.data;
    },
    onSuccess: (newTodo) => {
      queryClient.setQueriesData(["todos"], (oldTodos: any[]) => { 
        return [...oldTodos, newTodo];
      });

    },
    onError: () => {
      console.log("error");
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

      {fethchTodos.isLoading && <p>Loading...</p>}
      {fethchTodos.isError && <p>Error...</p>}

      {fethchTodos.data && (
        // <pre>
        //   { JSON.stringify(fethchTodos.data, null, 2)}
        // </pre>
        fethchTodos.data.map((user: NewTodo) => (
          <p>{ user.title}</p>
        ))
      )}
    </>
  );
}
