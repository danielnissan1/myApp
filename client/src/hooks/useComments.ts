import axios from "axios";
import { useState } from "react";
import { IComment, IPost, IUser } from "../types/types";
import { useLocalStorage } from "./useLocalStorage";
import { instance } from "../App";

export const useComments = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [getRefreshToken, setRefreshToken] = useLocalStorage(
    "refreshToken",
    ""
  );
  const storedRefreshToken = getRefreshToken();

  const getComments = async (postId: string): Promise<IComment[]> => {
    try {
      const res = await instance.get(`/comments/${postId}`);
      return res.data;
    } catch (err) {
      console.error("CORS Error:", err);
      return [];
    }
  };

  const createComment = (comment: IComment) => {
    axios
      .post(`${process.env.BASE_URL}/comments`, comment, {
        headers: {
          Authorization: `Bearer ${storedRefreshToken}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.error("CORS Error:", err));
  };

  return {
    getComments,
    createComment,
  };
};
