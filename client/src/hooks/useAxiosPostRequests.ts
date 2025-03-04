import axios from "axios";
import { FieldValues } from "react-hook-form";
import { RoutesValues } from "../consts/routes";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../atoms/userAtom";
import { useSetRecoilState } from "recoil";

export const useAxiosPostRequests = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);

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
            reject(err);
          });
      }
    });
  };

  const onSignUp = async (data: FieldValues) => {
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
        setUser(response.data);

        console.log("res: ", response.data);
      })
      .catch((err) => {
        console.log("err", err);
      });

    navigate(RoutesValues.HOME);
  };

  return { onSignUp, uploadImage };
};
