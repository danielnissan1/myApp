import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Feed from "./pages/Feed/feed";
import Profile from "./pages/Profile/profile";
import NewPost from "./pages/NewPost/newPost";
import Login from "./components/Login/login";
import Register from "./components/Login/Register/register";
import "./App.css";
import axios from "axios";
import { RoutesValues } from "./consts/routes";
import Layout from "./components/Layout/layout";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "./atoms/userAtom";

// const baseURL = "http://localhost:80/api";
const baseURL = process.env.REACT_APP_BASE_URL;
export const instance = axios.create({
  baseURL,
  // headers: {
  //   "Access-Control-Allow-Origin": "*",
  // },
  withCredentials: true,
});

function App() {
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <Routes>
      <Route path={RoutesValues.LOGIN} element={<Login />}></Route>
      <Route path={RoutesValues.REGISTER} element={<Register />}></Route>

      <Route element={<Layout />}>
        <Route path={RoutesValues.HOME} element={<Feed />}></Route>
        <Route path={RoutesValues.PROFILE} element={<Profile />}></Route>
        <Route path={RoutesValues.NEW_POST} element={<NewPost />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
