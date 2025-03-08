import axios from "axios";
import { useState } from "react";
import { IPost } from "../types/types";

export const useProfile = (userId: string) => {
  const [posts, setPosts] = useState({ posts: [] } as { posts: IPost[] });

  const getUsersPosts = async () => {
    axios
      .get(`http://localhost:3001/posts?owner=${userId}`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.error("CORS Error:", err));
  };

  return { getUsersPosts, posts };
};
