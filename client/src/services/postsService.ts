import axios from "axios";
import { IPost } from "../types/types";
import { useLocalStorage } from "../hooks/useLocalStorage";

const [getRefreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");

export const getPosts = async (): Promise<IPost[]> => {
  // let allPosts: IPost[] = [];
  try {
    const res = await axios.get("http://localhost:3001/posts");

    return res.data;
  } catch (err) {
    console.error("CORS Error:", err);
    return [];
  }
};

export const getPost = async (id: string): Promise<IPost | undefined> => {
  try {
    const res = await axios.get(`http://localhost:3001/posts/${id}`);
    return res.data;
  } catch (err) {
    console.error("CORS Error:", err);
    return undefined;
  }
};

const storedRefreshToken = getRefreshToken();

export const createPost = (post: IPost) => {
  axios
    .post("http://localhost:3001/posts", post, {
      headers: {
        Authorization: `Bearer ${storedRefreshToken}`,
      },
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.error("CORS Error:", err));
};
