import axios from "axios";
import { useState } from "react";
import { IPost, IUser } from "../types/types";
import { useLocalStorage } from "./useLocalStorage";

export const useProfile = (userId: string) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [getRefreshToken, setRefreshToken] = useLocalStorage(
    "refreshToken",
    ""
  );
  const storedRefreshToken = getRefreshToken();

  const getUsersPosts = async () => {
    axios
      .get(`http://localhost:80/posts/${userId}`, {
        headers: {
          Authorization: `Bearer ${storedRefreshToken}`,
        },
      })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.error("CORS Error:", err));
  };

  const updateUser = (userId: string, user: IUser) => {
    console.log("user in req:", user);

    axios
      .put(`http://localhost:80/auth/${userId}`, user, {
        headers: {
          Authorization: `Bearer ${storedRefreshToken}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.error("CORS Error:", err));
  };

  return { getUsersPosts, posts, updateUser };
};
