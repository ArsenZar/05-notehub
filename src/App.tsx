import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import axios from 'axios';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface FetchPostsResponse {
  posts: Post[];
}

export const fetchPosts = async (searchText: string) => {
  const res = await axios.get<FetchPostsResponse>(
    'https://dummyjson.com/posts/search',
    {
      params: {
        q: searchText,
      },
    }
  );
  return res.data.posts;
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: posts, isFetching } = useQuery({
    queryKey: ['posts', searchQuery],
    queryFn: () => fetchPosts(searchQuery),
    placeholderData: keepPreviousData,
  });

  const updateSearchQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value),
    1000
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
