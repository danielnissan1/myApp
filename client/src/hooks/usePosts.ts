import axios from "axios";
import { useState } from "react";
import { IPost, IUser } from "../types/types";
import { useLocalStorage } from "./useLocalStorage";

export const usePosts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [getRefreshToken, setRefreshToken] = useLocalStorage(
    "refreshToken",
    ""
  );
  const storedRefreshToken = getRefreshToken();

  const getPosts = async (): Promise<IPost[]> => {
    try {
      const res = await axios.get("http://localhost:80/posts");

      return res.data;
    } catch (err) {
      console.error("CORS Error:", err);
      return [];
    }
  };

  const getPost = async (id: string): Promise<IPost | undefined> => {
    try {
      const res = await axios.get(`http://localhost:80/posts/${id}`);
      return res.data;
    } catch (err) {
      console.error("CORS Error:", err);
      return undefined;
    }
  };

  const createPost = async (
    post: IPost,
    img: File,
    uploadImage: (file: File, url: string) => Promise<string>
  ) => {
    const imgUrl = await uploadImage(img, "http://localhost:80/file");

    try {
      const response = await axios.post(
        "http://localhost:80/posts",
        {
          ...post,
          imgSrc: imgUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${storedRefreshToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };

  const deletePost = (postId: string) => {
    axios
      .delete(`http://localhost:80/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${storedRefreshToken}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.error("CORS Error:", err));
  };

  const updatePost = (postId: string, post: IPost) => {
    axios
      .put(`http://localhost:80/posts/${postId}`, post, {
        headers: {
          Authorization: `Bearer ${storedRefreshToken}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.error("CORS Error:", err));
  };

  const likePost = (postId: string, userId: string) => {
    axios
      .post(
        "http://localhost:80/posts/addlike",
        { postId, userId },
        {
          headers: {
            Authorization: `Bearer ${storedRefreshToken}`,
          },
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.error("CORS Error:", err));
  };

  const unlikePost = (postId: string, userId: string) => {
    axios
      .post(
        `http://localhost:80/posts/removelike`,
        { postId, userId },
        {
          headers: {
            Authorization: `Bearer ${storedRefreshToken}`,
          },
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.error("CORS Error:", err));
  };

  return {
    getPosts,
    getPost,
    createPost,
    deletePost,
    updatePost,
    likePost,
    unlikePost,
  };
};
