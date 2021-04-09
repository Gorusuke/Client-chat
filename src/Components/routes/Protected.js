import React from "react";
import { Redirect, Route } from "react-router-dom";
import useUser from "../hooks/useUser";

export const Protected = ({ component: Component, ...props }) => {
  const usuario = localStorage.getItem("token");
  useUser();

  return (
    <Route
      {...props}
      render={(props) =>
        !usuario ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};
