import { useState, useEffect } from "react";
import axios from "axios";
import { IPost } from "../types/types";

const useGetPostsPagination = (page: number) => {
  const [data, setData] = useState<{ posts: IPost[]; totalPages: number }>({
    posts: [],
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:3001/posts", {
          params: { page },
        });
        setData({
          posts: response.data.posts,
          totalPages: response.data.totalPages,
        });
      } catch (err) {
        setError("Failed to fetch posts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  return { data, isLoading, error };
};

export default useGetPostsPagination;
