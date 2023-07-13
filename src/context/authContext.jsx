import { createContext, useContext, useState, useCallback } from "react";

import { registerUserRequest } from "../api";

export const AuthContext = createContext({
  token: null,
  setToken: () => {},
  registerInfo: {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  },
  registerUser: () => {},
  updateRegisterInfo: () => {},
  registerError: null,
  isRegisterLoading: false,
  user: null,
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //   const [token, setToken] = useState("123");
  const [token, setToken] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        setIsRegisterLoading(true);
        setRegisterError(null);
        const response = await registerUserRequest(registerInfo);
        console.log({ response });
      } catch (err) {
        console.log({ err });
        // setRegisterError()
      } finally {
        setIsRegisterLoading(false);
      }

      setIsRegisterLoading(false);
    },
    [registerInfo]
  );

  return (
    <AuthContext.Provider
      value={{
        token,
        registerInfo,
        registerUser,
        updateRegisterInfo,
        isRegisterLoading,
        registerError,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
