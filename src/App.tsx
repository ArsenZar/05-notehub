import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
// 1. Імпортуємо хук
import { useFetchPosts } from './hooks/useFetchPosts';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  // 2. Використовуємо хук
  const { data: posts, isFetching } = useFetchPosts(searchQuery);

  const updateSearchQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value),
    300
  );

  return (
    <>
      <input
        type="text"
        defaultValue={searchQuery}
        onChange={updateSearchQuery}
        placeholder="Search posts"
      />
      {isFetching && <div>Loading posts...</div>}
      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}
