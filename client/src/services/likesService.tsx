import axios from "axios";
import post from "../components/Posts/post";
import { read } from "fs";

export const getLikesNum = async (postId: string): Promise<number> => {
  try {
    const res = await axios.get(`http://localhost:3001/likes/${postId}`);
    return res.data.length;
  } catch (err) {
    console.error("CORS Error:", err);
    return 0;
  }
};

export const getLikes = async (postId: string): Promise<string[]> => {
  try {
    const res = await axios.get(`http://localhost:3001/likes/${postId}`);
    return res.data;
  } catch (err) {
    console.error("CORS Error:", err);
    return [];
  }
};

export const createLike = (postId: string, userId: string) => {
  axios
    .post("http://localhost:3001/likes", { postId, userId })
    .then((res) => console.log(res.data))
    .catch((err) => console.error("CORS Error:", err));
};
