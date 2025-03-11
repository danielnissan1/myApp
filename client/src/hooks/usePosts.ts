import axios from "axios";
import { useState } from "react";
import { IPost, IUser } from "../types/types";
import { useLocalStorage } from "./useLocalStorage";
import { instance } from "../App";

export const usePosts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [getRefreshToken, setRefreshToken] = useLocalStorage(
    "refreshToken",
    ""
  );
  const storedRefreshToken = getRefreshToken();

  const getPosts = async (): Promise<IPost[]> => {
    try {
      const res = await instance.get(`/posts`);

      return res.data;
    } catch (err) {
      console.error("CORS Error:", err);
      return [];
    }
  };

  const getPost = async (id: string): Promise<IPost | undefined> => {
    try {
      const res = await instance.get(`/posts/${id}`);
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
    const imgUrl = await uploadImage(img, `${process.env.BASE_URL}/file`);

    try {
      const response = await axios.post(
        `${process.env.BASE_URL}/posts`,
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
      .delete(`${process.env.BASE_URL}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${storedRefreshToken}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.error("CORS Error:", err));
  };

  const updatePost = (postId: string, post: IPost) => {
    axios
      .put(`${process.env.BASE_URL}/posts/${postId}`, post, {
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
        `${process.env.BASE_URL}/posts/addlike`,
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
        `${process.env.BASE_URL}/posts/removelike`,
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
