import React from "react";
import { POST } from "../../../../../hooks/Conexion";
import mensajes from "../../../../../utilidades/Mensajes";
import { getToken } from "../../../../../utilidades/Sessionutil";

const ApiOption = () => {
  return (
    <>
      <div
        className={"col-2 justify-content-center btn btn-outline-danger"}
        style={{
          scale: "1.2",
          width: "25%",
          padding: "80px",
          color: "white",
          fontFamily: "Arial",
          fontWeight: "bold",
          borderRadius: "20px",
        }}
        onClick={() => {
          const datos = {
            isAdmin: true,
          };
          POST(datos, `redirigir/api/${datos.isAdmin}`, getToken()).then(
            (info) => {
              if (info.code != 200) {
                mensajes(info.msg, "error", "Error de Acceso");
              } else {
                mensajes(info.msg, "success", "Exito");
                window.open("http://localhost:8000/", "_blank");
              }
            }
          );
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="130"
          height="200"
          fill="currentColor"
          className="bi bi-key-fill"
          viewBox="0 0 16 16"
        >
          <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
        </svg>

        <label style={{ fontSize: "10px", scale: "1.7" }}>
          Acceso a la API
        </label>
      </div>
    </>
  );
};

export default ApiOption;
