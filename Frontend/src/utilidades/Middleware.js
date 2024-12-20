import React from "react";
import { borrarSesion, estaSesion } from "./Sessionutil";
import { Navigate } from "react-router";

export const MiddlewareSesion = ({ children }) => {
  const autenticado = estaSesion();
  if (autenticado) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export const MiddlewareNoSesion = ({ children }) => {
  const autenticado = estaSesion();
  if (autenticado) {
    borrarSesion();
  }
  return children;
};
