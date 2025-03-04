import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RoutesValues } from "../consts/routes";
import ErrorModal from "../components/Modals/errorModal";
import { useState } from "react";

export const useAuth = (email: string, password: string) => {
  const navigate = useNavigate();
  const [error, setError] = useState();

  const onLogin = () => {
    axios
      .post("http://localhost:3001/auth/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        //TODO: save the details
        navigate(RoutesValues.HOME);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  const onLogout = () => {
    // axios
    //   .post("http://localhost:3001/auth/logout", {
    //     email: email,
    //     password: password,
    //   })
    //   .then((response) => {
    //     //TODO: save the details
    //     navigate(RoutesValues.HOME);
    //   })
    //   .catch((err) => {
    //     //TODO: error modal + type with different errors english: hebrew label
    //     console.log("err", err);
    //   });
  };

  return { onLogin, error };
};
