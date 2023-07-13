import React from "react";
import { Navigate } from "react-router-dom";

import { useAuthContext } from "../context/authContext";

export const Login = () => {
  const { token } = useAuthContext();

  if (token) {
    return <Navigate replace to="/" />;
  }

  return <div>Login</div>;
};
