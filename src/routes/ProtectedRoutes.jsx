import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

/* eslint-disable react/prop-types */
const ProtectedRoutes = ({ children }) => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const user = sessionStorage.getItem("user");

  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  // return children ? children : <Outlet />;
};

export default ProtectedRoutes;
