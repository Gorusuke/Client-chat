import React from "react";
import { Redirect, Route } from "react-router-dom";

export const Protected = ({ component: Component, ...props }) => {
  const usuario = sessionStorage.getItem("token");

  return (
    <Route
      {...props}
      render={(props) =>
        !usuario ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};
