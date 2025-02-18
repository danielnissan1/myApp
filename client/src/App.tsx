import React from "react";
import { Routes, Route } from "react-router-dom";
import Feed from "./pages/feed";
import Profile from "./pages/profile";
import NewPost from "./pages/newPost";
import PostPage from "./pages/postPage";
import Login from "./components/Login/login";
import Register from "./components/Login/register";
import "./App.css";
import axios from "axios";
import { RoutesValues } from "./consts/routes";
import NavBar from "./components/Bars/bottomNavbar";
import TopBar from "./components/Bars/topbar";

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
  _id: string;
  owner: IUser;
  imgSrc: string;
  date: Date;
  isSold: boolean;
  content: string;
  location: string;
  price: number;
}
const user: IUser = {
  id: 1,
  userName: "Kermit",
  avatar:
    "https://i.pinimg.com/474x/db/08/0f/db080fceb9fa616315bd6f9c3b8a9632.jpg",
};

//maybe add the topbar+botoombar here above the right routes
function App() {
  return (
    <div className="App">
      <TopBar />
      <div className="pages">
        <Routes>
          <Route path={RoutesValues.LOGIN} element={<Login />}></Route>
          <Route path={RoutesValues.REGISTER} element={<Register />}></Route>
          <Route path={RoutesValues.HOME} element={<Feed />}></Route>
          <Route path={RoutesValues.POSTS} element={<PostPage />}></Route>
          <Route path={RoutesValues.PROFILE} element={<Profile />}></Route>
          <Route path={RoutesValues.NEW_POST} element={<NewPost />}></Route>
        </Routes>
      </div>

      <div className="navbar">
        <NavBar />
      </div>
    </div>
  );
}

export default App;
