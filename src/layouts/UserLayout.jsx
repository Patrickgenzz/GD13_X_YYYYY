// @ts-nocheck
import { Outlet } from "react-router-dom";

// import component
import TopNavbar from "../components/TopNavbar";

//mengatur route yang akan ditampilkan di navbar
const routes = [
  {
    path: "/user",
    name: "Home",
  },
  {
    path: "/user/content",
    name: "My Videos",
  }
];

/* eslint-disable react/prop-types */
const UserLayout = ({ children }) => {
  return (
    <div className="mt-4 pt-5">
      <TopNavbar routes={routes} />
      {children ? children : <Outlet />}
    </div>
  );
};

export default UserLayout;
