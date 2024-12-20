import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router";
import { useState } from "react";
import Header from "../Public/Header";
import ContenedorInicio from "../../Componentes/ContenedorInicio";
import FuncionesAdmin from "./FuncionesAdmin";
import Usuarios from "./Gestionar Usuario/Usuarios";
import Devices from "./Gestionar Dispositivos/Devices";
import Mediciones from "./Gestionar Dispositivos/Mediciones/Mediciones";
import Solicitudes from "./Gestionar Tokens/Solicitudes";
import Bot from "../../Componentes/ChatBot/Bot";

const PaginaInicioAdmin = () => {
  const location_props = useLocation();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("data")).user
  );
  function permitirBot() {
    switch (location_props.pathname) {
      case "/admin":
        return true;
      default:
        return false;
    }
  }
  function obtener_componente() {
    switch (location_props.pathname) {
      case "/admin":
        return <ContenedorInicio isAdmin={true} />;
      case "/admin/gestion":
        return <FuncionesAdmin />;
      case "/admin/gestion/usuarios":
        return <Usuarios />;
      case "/admin/gestion/dispositivos":
        return <Devices />;
      case "/admin/gestion/dispositivos/mediciones":
        return <Mediciones />;
      case "/admin/gestion/solicitudes":
        return <Solicitudes />;
      case "/admin/configuracion":
        return <FuncionesAdmin configuracion={true} user={user} />;
      default:
        break;
    }
  }
  return (
    <>
      <section
        className="home"
        style={{
          backgroundPosition: "center",
          boxShadow: "inset 0 100px 50px 4px rgb(0 0 0 / 40%)",
        }}
      >
        <Header isAdmin={true} user={user} />
        <>
          <div
            className="container text-center"
            style={{
              transform: "translateY(150px)",
              alignItems: "center",
              backgroundColor: "rgba(19, 35, 64, 0.6)",
              borderRadius: "20px",
            }}
          >
            {obtener_componente()}
          </div>
          {permitirBot() ? (
            <div
              className="contenedor-borde-izquierdo-abajo"
              style={{
                position: "fixed",
                bottom: "50px",
                right: "40px",
                width: "450px", // Ajusta el ancho según tus necesidades
                height: "600px", // Ajusta la altura según tus necesidades
                borderRadius: "10px", // Ajusta el radio de borde según tus necesidades
                zIndex: "2", // Asegura que esté por encima del contenedor principal
              }}
            >
              <Bot usuario={user} isUser={true} />
            </div>
          ) : null}
        </>
      </section>
    </>
  );
};

export default PaginaInicioAdmin;
