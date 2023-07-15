import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
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
      <ToastContainer />
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
