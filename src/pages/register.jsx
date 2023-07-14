import React from "react";
import { NavLink, Navigate } from "react-router-dom";

import { useAuthContext } from "../context/authContext";

export const Register = () => {
  const { token, registerUser, registerInfo, updateRegisterInfo } =
    useAuthContext();

  if (token) {
    return <Navigate replace to="/" />;
  }
  return (
    <form
      className="flex justify-center items-center flex-col mt-20 w-full m-auto max-w-xs"
      onSubmit={registerUser}
    >
      <h1 className="text-white font-bold mb-5">Register to verify your bvn</h1>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        className="mb-8 w-full"
        onChange={({ target: { value } }) =>
          updateRegisterInfo({ ...registerInfo, name: value })
        }
      />
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        className="mb-8  w-full"
        onChange={({ target: { value } }) =>
          updateRegisterInfo({ ...registerInfo, email: value })
        }
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        className="mb-8  w-full"
        onChange={({ target: { value } }) =>
          updateRegisterInfo({ ...registerInfo, password: value })
        }
      />
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Password confirmation"
        className="mb-8  w-full"
        onChange={({ target: { value } }) =>
          updateRegisterInfo({ ...registerInfo, password_confirmation: value })
        }
      />

      <button type="submit" className="bg-green-400 w-full py-2 rounded">
        Register
      </button>

      <p className="text-white mt-4">
        Have an account?{" "}
        <NavLink to="/login" className="underline">
          login
        </NavLink>
      </p>
    </form>
  );
};
