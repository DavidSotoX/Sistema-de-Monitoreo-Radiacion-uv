export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const saveMensajes = (mensajes) => {
  localStorage.setItem("mensajes", JSON.stringify(mensajes));
};

export const getMensajes = () => {
  return JSON.parse(localStorage.getItem("mensajes"));
};

export const hayMensajes = () => {
  var mensajes = localStorage.getItem("mensajes");
  return mensajes && (mensajes !== "undefined" || mensajes !== null);
};
export const borrarMensajes = () => {
  localStorage.removeItem("mensajes");
};

export const borrarSesion = () => {
  localStorage.clear();
};

export const estaSesion = () => {
  var token = localStorage.getItem("token");
  return token && (token !== "undefined" || token !== null || token !== "null");
};
