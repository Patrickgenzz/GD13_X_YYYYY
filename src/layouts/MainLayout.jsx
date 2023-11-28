// @ts-nocheck
import { Outlet } from "react-router-dom";

// import component
import TopNavbar from "../components/TopNavbar";

//mengatur route yang akan ditampilkan di navbar
const routes = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/login",
    name: "Login",
  },
  {
    path: "/register",
    name: "Register",
  },
];

/* eslint-disable react/prop-types */
const MainLayout = ({ children }) => {
  return (
    <div className="mt-4 pt-5">
      <TopNavbar routes={routes} />
      {children ? children : <Outlet />}
    </div>
  );
};

export default MainLayout;
