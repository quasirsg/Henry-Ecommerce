import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import FormCategory from "../categoryForm";
import TablaUsuarios from "../tablaUsuarios";
import Orden from "../tablaOrdenes/Orden";
import TablaOrdenes from "../tablaOrdenes";
import AdminMenu from "../admin";
import { getCurrentUser, verifySession } from "../../redux/actions/jwtUsers";

const ProtectedAdminRoute = ({ component: AdminMenu, log, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (log) {
          if (log === "admin") {
            return <AdminMenu {...props} />;
          } else {
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
        }
      }}
    />
  );
};

export default ProtectedAdminRoute;
