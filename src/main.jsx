import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import "./app.css";
import { Login } from "./pages/login.jsx";
import { Register } from "./pages/register.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";
import { Bvn } from "./components/bvn.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Bvn /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
