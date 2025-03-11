import axios from "axios";
import { FieldValues } from "react-hook-form";
import { RoutesValues } from "../consts/routes";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../atoms/userAtom";
import { useSetRecoilState } from "recoil";
import { useLocalStorage } from "./useLocalStorage";
import { useState } from "react";

export const useSignUp = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);
  const [error, setError] = useState<any>();
  const [getRefreshToken, setRefreshToken] = useLocalStorage(
    "refreshToken",
    ""
  );

  const onSignUp = async (imgUrl: string, data: FieldValues) => {
    console.log("imageurl", imgUrl);
    console.log("data:", data);

    axios
      .post("http://localhost:80/auth/register", {
        username: data.username,
        email: data.email,
        password: data.password,
        avatar: imgUrl,
      })
      .then((response) => {
        const { refreshToken } = response.data;

        setRefreshToken(refreshToken);

        console.log("refreshToken: ", getRefreshToken());

        setUser(response.data);

        navigate(RoutesValues.HOME);
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data);
      });
  };

  return { onSignUp, error, setError };
};
