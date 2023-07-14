import React from "react";

import { useAuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

export const Bvn = () => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate replace to="/login" />;
  }
  return <div>Bvn</div>;
};
