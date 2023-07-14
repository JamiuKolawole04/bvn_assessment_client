import { createContext, useContext, useState, useCallback } from "react";

import { registerUserRequest, loginUserRequest } from "../api";

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
  loginInfo: { email: "", password: "" },
  loginError: null,
  isLoginLoading: false,
  updateLoginInfo: () => {},
  loginUser: () => {},
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
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

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
        // setUser()
      } catch (err) {
        console.log({ err });
        // setRegisterError()
        // localStorage.setItem("user", JSON.stringify())
      } finally {
        setIsRegisterLoading(false);
      }

      setIsRegisterLoading(false);
    },
    [registerInfo]
  );
  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        setIsLoginLoading(true);
        setLoginError(null);

        const response = await loginUserRequest(loginInfo);
        // setUser(response.user);
        // localStorage.setItem("user", JSON.stringify(response.user));
      } catch (err) {
        console.log({ err });
      } finally {
        setIsLoginLoading(false);
      }
    },
    [loginInfo]
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
        loginInfo,
        isLoginLoading,
        loginError,
        updateLoginInfo,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
