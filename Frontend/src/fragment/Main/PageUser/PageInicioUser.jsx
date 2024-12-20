import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router";
import { useState } from "react";
import Header from "../Public/Header";
import ContenedorInicio from "../../Componentes/ContenedorInicio";
import ConfiguracionUsuario from "./Configuracion/ConfiguracionUsuario";
import Bot from "../../Componentes/ChatBot/Bot";

const PaginaInicioUser = () => {
  const location_props = useLocation();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("data")).user
  );
  function permitirBot() {
    switch (location_props.pathname) {
      case "/inicio":
        return true;
      default:
        return false;
    }
  }
  function obtener_componente() {
    switch (location_props.pathname) {
      case "/inicio":
        return <ContenedorInicio />;
      case "/inicio/configuracion":
        return <ConfiguracionUsuario user={user} />;

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
        <Header user={user} />
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

export default PaginaInicioUser;
