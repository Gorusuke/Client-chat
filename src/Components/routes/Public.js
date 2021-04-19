import React from "react";
import { Redirect, Route } from "react-router-dom";

export const Public = ({ component: Component, ...props }) => {
  const usuario = sessionStorage.getItem("token");

  return (
    <Route
      {...props}
      render={(props) =>
        usuario ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};
