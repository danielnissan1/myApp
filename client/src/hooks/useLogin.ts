import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RoutesValues } from "../consts/routes";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import { useLocalStorage } from "./useLocalStorage";
import { instance } from "../App";
import axiosInstance from "../services/axiosInstance";

export const useLogin = (
  email: string,
  password: string,
  setError: React.Dispatch<React.SetStateAction<undefined>>
) => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);
  const [getRefreshToken, setRefreshToken] = useLocalStorage(
    "refreshToken",
    ""
  );

  const onLogin = () => {
    instance
      .post(`/auth/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("resonde:", response.data);
        const { refreshToken } = response.data;

        setRefreshToken(refreshToken);

        console.log("refreshToken: ", getRefreshToken());

        setUser(response.data);
        navigate(RoutesValues.HOME);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  return { onLogin };
};
