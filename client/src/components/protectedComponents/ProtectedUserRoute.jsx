import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import toast from "../alerts/toast";

const ProtectedUserRoute = ({ component: Component, log, ...rest }) => {
  let { token } = localStorage;
  if (token) {
    return (
      <Route
        {...rest}
        render={(props) => {
          if (log === "client") {
            return <Component />;
          } else if (log === "admin") {
            toast.fire({
              icon: "error",
              title: `Error: Debes iniciar sesion`,
            });
            return (
              <Redirect
                to={{
                  pathname: "/user/login",
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }
        }}
      />
    );
  } else {
    toast.fire({
      icon: "error",
      title: `Error: Debes iniciar sesion`,
    });
    return <Redirect to={`/user/login`} />;
  }
};

export default ProtectedUserRoute;
