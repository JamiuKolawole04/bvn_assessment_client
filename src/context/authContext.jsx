import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { toast } from "react-toastify";

import { registerUserRequest, loginUserRequest } from "../api";

export const AuthContext = createContext({
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
  useEffect(() => {
    const user = localStorage.getItem("user");

    setUser(JSON.parse(user));
  }, []);

  const [user, setUser] = useState(null);
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
        setUser(response.data.user);

        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        toast.success("register success", {
          position: "top-right",
        });
      } catch (err) {
        if (err.response.data.errors?.email) {
          toast.error(err.response.data.errors?.email[0], {
            position: "top-right",
          });
        } else if (err.response.data.errors?.password) {
          toast.error(err.response.data.errors?.password[0], {
            position: "top-right",
          });
        } else {
          toast.error(err.response.data?.message, {
            position: "top-right",
          });
        }
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
        setUser(response.data.user);

        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        toast.success("login success", {
          position: "top-right",
        });
      } catch (err) {
        if (err.response.data.errors?.email) {
          toast.error(err.response.data.errors?.email[0], {
            position: "top-right",
          });
        } else if (err.response.data.errors?.password) {
          toast.error(err.response.data.errors?.password[0], {
            position: "top-right",
          });
        } else {
          toast.error(err.response.data?.message, {
            position: "top-right",
          });
        }
      } finally {
        setIsLoginLoading(false);
      }
    },
    [loginInfo]
  );

  return (
    <AuthContext.Provider
      value={{
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
