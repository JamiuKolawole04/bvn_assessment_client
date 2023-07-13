import React from "react";

import { useAuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

export const Register = () => {
  const { token } = useAuthContext();

  if (token) {
    return <Navigate replace to="/" />;
  }
  return (
    <form className="flex justify-center items-center flex-col mt-20 w-full m-auto max-w-xs">
      <h1 className="text-white font-bold mb-5">Register to verify your bvn</h1>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        className="mb-8 w-full"
      />
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        className="mb-8  w-full"
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        className="mb-8  w-full"
      />
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Password confirmation"
        className="mb-8  w-full"
      />

      <button type="submit" className="bg-green-400 w-full py-2 rounded">
        Register
      </button>
    </form>
  );
};