import React from "react";

import { useAuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

export const Register = () => {
  const { token } = useAuthContext();

  if (token) {
    return <Navigate replace to="/" />;
  }
  return <div className="bg-red-950">Register</div>;
};
