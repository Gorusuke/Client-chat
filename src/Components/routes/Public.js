import React from "react";
import { Redirect, Route } from "react-router-dom";
import useUser from "../hooks/useUser";

export const Public = ({ component: Component, ...props }) => {
  const usuario = sessionStorage.getItem("token");
  useUser();

  return (
    <Route
      {...props}
      render={(props) =>
        usuario ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};
