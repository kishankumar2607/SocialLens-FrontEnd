import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/utils";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("token") ? JSON.parse(getCookie("token")) : null;
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
