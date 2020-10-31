import React from "react";
import { Redirect, Route } from "react-router-dom";
import toast from "../alerts/toast";

const ProtectedAdminRoute = ({
  component: Component,
  log,
  action,
  icon,
  message,
  ...rest
}) => {
  let { token } = localStorage;
  if (token) {
    return (
      <Route
        {...rest}
        render={(props) => {
          if (log === "admin") {
            return <Component action={action} icon={icon} message={message} />;
          } else if (log === "client") {
            toast.fire({
              icon: "error",
              title: `Error: Debes iniciar sesion como administrador"`,
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
      title: `Error: Debes iniciar sesion como administrador"`,
    });
    return (
      <Redirect
        to={{
          pathname: "/user/login",
        }}
      />
    );
  }
};

export default ProtectedAdminRoute;
