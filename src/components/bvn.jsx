import React from "react";

import { useAuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

export const Bvn = () => {
  const { token } = useAuthContext();

  if (!token) {
    return <Navigate replace to="/login" />;
  }
  return <div>Bvn</div>;
};
