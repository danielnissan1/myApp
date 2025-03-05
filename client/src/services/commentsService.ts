import axios from "axios";
import { IComment } from "../types/types";
import { useLocalStorage } from "../hooks/useLocalStorage";

const [getRefreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");

export const getComments = async (postId: string): Promise<IComment[]> => {
  try {
    const res = await axios.get(`http://localhost:3001/comments/${postId}`);
    return res.data;
  } catch (err) {
    console.error("CORS Error:", err);
    return [];
  }
};

const storedRefreshToken = getRefreshToken();

export const createComment = (comment: IComment) => {
  axios
    .post("http://localhost:3001/comments", comment, {
      headers: {
        Authorization: `Bearer ${storedRefreshToken}`,
      },
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.error("CORS Error:", err));
};
