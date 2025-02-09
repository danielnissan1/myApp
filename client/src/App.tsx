import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import logo from "./logo.svg";
import Post from "./components/post";
import UserProvider, { UserContext } from "./context";
import Feed from "./pages/feed";
import Profile from "./pages/profile";
import NewPost from "./pages/newPost";
import NavBar from "./components/navbar";
import "./App.css";
import axios from "axios";
import Login from "./pages/login";
import { useNavigate } from "react-router-dom";
import { Comments } from "./components/comments";

// const navigate = useNavigate();

const baseURL = "http://localhost:3001";
export const instance = axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

export interface IUser {
  id: number;
  userName: string;
  avatar: string;
}
export interface IPost {
  id: number;
  owner: IUser;
  likes: IUser[];
  imgSrc: string;
  date: Date;
}
const user: IUser = {
  id: 1,
  userName: "Kermit",
  avatar:
    "https://i.pinimg.com/474x/db/08/0f/db080fceb9fa616315bd6f9c3b8a9632.jpg",
};
const post: IPost = {
  id: 1,
  date: new Date(),
  imgSrc:
    "https://i.pinimg.com/474x/ed/69/55/ed6955fe79e587d6f648f82c2e445dd4.jpg",
  likes: [user],
  owner: user,
};

function App() {
  // const [users, setUserss] = useState<IUser[]>([
  //   {
  //     id: 1,
  //     name: "Ariel",
  //     avatar:
  //       "C:UsersקורלDocumentsinstagram\frontend-Instagram\frontsrcariel.jpg",
  //   },
  // ]);

  // navigate("/login");

  const { user } = React.useContext(UserContext);

  return (
    <div className="App">
      <div className="pages">
        {/* <Routes>
          {!user.id ? (
            <Route path="/*" element={<Navigate to="/login" />} />
          ) : (
            <>
              <Route path="/new_post" element={<NewPost />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Feed />} />
            </>
          )} */}

        {/* <Route path="/login" element={<Login />} /> */}
        {/* </Routes> */}
      </div>
      <Post post={post}></Post>
      <Comments postId={post.id.toString()} />

      <div className="navbar">
        <NavBar />
      </div>
    </div>
  );
}

export default App;
