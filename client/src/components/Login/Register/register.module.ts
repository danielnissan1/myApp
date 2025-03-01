import axios from "axios";
import { FieldValues } from "react-hook-form";
import { RoutesValues } from "../../../consts/routes";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const onSignUp = (data: FieldValues) => {
  console.log(data);
  axios
    .post("http://localhost:3001/auth/register", {
      username: data.username,
      email: data.email,
      password: data.password,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });

  navigate(RoutesValues.HOME);
};

export { onSignUp };
