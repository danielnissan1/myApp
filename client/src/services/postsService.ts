import axios from "axios";
import { IPost } from "../types/types";
import { useLocalStorage } from "../hooks/useLocalStorage";

const [getRefreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");

export const getPosts = () => {
  let allPosts: IPost[] = [];
  axios
    .get("http://localhost:3001/posts")
    .then((res) => (allPosts = res.data))
    .catch((err) => console.error("CORS Error:", err));

  return allPosts;
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

// const refreshToken = localStorage.getItem("refreshToken");

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
