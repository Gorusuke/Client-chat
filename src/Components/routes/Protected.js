import React from "react";
import { Redirect, Route } from "react-router-dom";

export const Protected = ({ component: Component, ...props }) => {
  const usuario = localStorage.getItem("token");
  // if(usuario.length === undefined){
  //     (<Redirect to='/login' />)
  // }

  return (
    <Route
      {...props}
      render={(props) =>
        !usuario ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};
