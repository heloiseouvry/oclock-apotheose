import React, { useContext, createContext, useState } from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ children, ...rest }) {
  let isLogged = !!localStorage.getItem("token");
  return (
    <Route
    {...rest}
    render={({ location }) => 
        isLogged ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;
