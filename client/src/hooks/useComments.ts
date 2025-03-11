import axios from "axios";
import { useState } from "react";
import { IComment, IPost, IUser } from "../types/types";
import { useLocalStorage } from "./useLocalStorage";

export const useComments = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [getRefreshToken, setRefreshToken] = useLocalStorage(
    "refreshToken",
    ""
  );
  const storedRefreshToken = getRefreshToken();

  const getComments = async (postId: string): Promise<IComment[]> => {
    try {
      const res = await axios.get(`http://localhost:80/comments/${postId}`);
      return res.data;
    } catch (err) {
      console.error("CORS Error:", err);
      return [];
    }
  };

  const createComment = (comment: IComment) => {
    axios
      .post("http://localhost:80/comments", comment, {
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
