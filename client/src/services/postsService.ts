import axios from "axios";
import { IPost } from "../types/types";
import { useLocalStorage } from "../hooks/useLocalStorage";

const [getRefreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");

export const getPosts = async (): Promise<IPost[]> => {
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

export const createPost = async (
  post: IPost,
  img: File,
  uploadImage: (file: File, url: string) => Promise<string>
) => {
  const imgUrl = await uploadImage(img, "http://localhost:3001/file");

  try {
    const response = await axios.post(
      "http://localhost:3001/posts",
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

export const deletePost = (postId: string) => {
  axios
    .delete(`http://localhost:3001/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${storedRefreshToken}`,
      },
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.error("CORS Error:", err));
};

export const updatePost = (postId: string, post: IPost) => {
  axios
    .put(`http://localhost:3001/posts/${postId}`, post, {
      headers: {
        Authorization: `Bearer ${storedRefreshToken}`,
      },
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.error("CORS Error:", err));
};

export const likePost = (postId: string, userId: string) => {
  axios
    .post(
      "http://localhost:3001/posts/addlike",
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

export const unlikePost = (postId: string, userId: string) => {
  axios
    .post(
      `http://localhost:3001/posts/removelike`,
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
