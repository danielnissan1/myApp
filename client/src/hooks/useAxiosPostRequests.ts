import axios from "axios";
import { FieldValues } from "react-hook-form";
import { RoutesValues } from "../consts/routes";
import { useNavigate } from "react-router-dom";
import { formData } from "../components/Login/Register/formData";

export const useAxiosPostRequests = () => {
  const navigate = useNavigate();

  const uploadImage = (file: File, url: string) => {
    console.log("file:", file);
    return new Promise<string>((resolve, reject) => {
      const formData = new FormData();
      console.log("form data:", formData);

      if (file) {
        formData.append("file", file);
        axios
          .post(url, formData, {
            headers: {
              "Content-Type": "image/jpeg",
            },
          })
          .then((res) => {
            console.log(res);
            const url = res.data.url;
            resolve(url);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      }
    });
  };

  const onSignUp = async (data: FieldValues) => {
    const imgUrl = await uploadImage(
      data.profileImage[0],
      "http//localhost/3001"
    );
    console.log("image url:", imgUrl);

    axios
      .post("http://localhost:3001/auth/register", {
        username: data.username,
        email: data.email,
        password: data.password,
        avatar: imgUrl,
      })
      .then((response) => {
        console.log("res: ", response.data);
      })
      .catch((err) => {
        console.log("err", err);
      });

    navigate(RoutesValues.HOME);
  };

  return { onSignUp, uploadImage };
};
