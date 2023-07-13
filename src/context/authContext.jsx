import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
  token: null,
  setToken: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("null");

  return (
    <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
