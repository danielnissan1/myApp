import axios from "axios";
import { FieldValues } from "react-hook-form";
import { RoutesValues } from "../consts/routes";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../atoms/userAtom";
import { useSetRecoilState } from "recoil";
import { useLocalStorage } from "./useLocalStorage";
import { useState } from "react";

export const useAxiosPostRequests = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);
  const [error, setError] = useState<any>();
  const [getRefreshToken, setRefreshToken] = useLocalStorage(
    "refreshToken",
    ""
  );

  const uploadImage = (file: File, url: string) => {
    return new Promise<string>((resolve, reject) => {
      const formData = new FormData();

      if (file) {
        formData.append("file", file);
        axios
          .post(url, formData, {
            headers: {
              "Content-Type": "image/jpeg",
            },
            withCredentials: true,
          })
          .then((res) => {
            const url = res.data.url;
            resolve(url);
          })
          .catch((err) => {
            setError("Upload Image Failed");
            reject(err);
          });
      } else {
        setError("Image profile is missing");
      }
    });
  };

  const onSignUp = async (data: FieldValues) => {
    console.log(data);
    const imgUrl = await uploadImage(
      data.profileImage[0],
      "http://localhost:3001/file"
    );

    axios
      .post("http://localhost:3001/auth/register", {
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

        console.log("res: ", response.data);
        navigate(RoutesValues.HOME);
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data);
      });
  };

  return { onSignUp, uploadImage, error, setError };
};
