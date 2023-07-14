import React from "react";
import { Navigate } from "react-router-dom";

import { useAuthContext } from "../context/authContext";

export const Login = () => {
  const { token, loginUser, loginInfo, updateLoginInfo } = useAuthContext();

  if (token) {
    return <Navigate replace to="/" />;
  }

  return (
    <form
      className="flex justify-center items-center flex-col mt-20 w-full m-auto max-w-xs"
      onSubmit={loginUser}
    >
      <h1 className="text-white font-bold mb-5">Login to verify your bvn</h1>

      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        className="mb-8  w-full"
        onChange={({ target: { value } }) =>
          updateLoginInfo({ ...loginInfo, email: value })
        }
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        className="mb-8  w-full"
        onChange={({ target: { value } }) =>
          updateLoginInfo({ ...loginInfo, password: value })
        }
      />

      <button type="submit" className="bg-green-400 w-full py-2 rounded">
        Login
      </button>
    </form>
  );
};
